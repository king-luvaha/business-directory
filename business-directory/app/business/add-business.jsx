import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { db, storage } from './../../configs/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo'

export default function AddBusiness() {

    const navigation = useNavigation();
    const [image,setImage] = useState(null);
    const [categoryList,setCategoryList] = useState([]);
    const { user } = useUser();
    const [name,setName] = useState();
    const [address,setAddress] = useState();
    const [contact,setContact] = useState();
    const [website,setWebsite] = useState();
    const [about,setAbout] = useState();
    const [category,setCategory] = useState();
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'Add New Business',
            headerShown:true,
        })
        GetCategoryList();
    },[]);

    const onImagePick = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    }

    const GetCategoryList = async() => {
        setCategoryList([]);
        const q = query(collection(db,'Category'));
        const snapShot = await getDocs(q);

        snapShot.forEach((doc)=>{
            setCategoryList(prev=>[...prev,{
                label:(doc.data()).name,
                value:(doc.data()).name
            }]);
        });
    }

    const onAddNewBusiness = async() => {
        setLoading(true);
        const fileName = Date.now().toString()+".jpg";
        const resp = await fetch(image);
        const blob = await resp.blob();

        const imageRef = ref(storage,'business-app/'+fileName);

        uploadBytes(imageRef,blob).then((snapshot)=>{
            console.log("File Uploaded");
        }).then(resp=>{
            getDownloadURL(imageRef).then(async(downloadUrl)=>{
                console.log(downloadUrl);
                await saveBusinessDetail(downloadUrl);
                // Reset state after successful submission
                setName('');
                setAddress('');
                setContact('');
                setWebsite('');
                setAbout('');
                setCategory('');
                setImage(null);
                setLoading(false);
                ToastAndroid.show('New Business Added',ToastAndroid.LONG)
            });
        }).catch(error => {
            console.error("Error uploading image: ", error);
            setLoading(false);
        });
    }

    const saveBusinessDetail = async(imageUrl)=>{
        await setDoc(doc(db,'BusinessList',Date.now().toString()),{
            name:name,
            address:address,
            contact:contact,
            about:about,
            website:website,
            category:category,
            username:user?.fullName,
            userEmail:user?.primaryEmailAddress?.emailAddress,
            userImage:user?.imageUrl,
            imageUrl:imageUrl
        });
    }

  return (
    <ScrollView>
        <View style={{
            padding:20
        }}>
            <Text style={{
            fontFamily:'outfit-bold',
            fontSize:25
            }}>Add Business</Text>
            <Text style={{
            fontFamily:'outfit',
            color:Colors.GRAY
            }}>Fill all the details in order to Add A New Business</Text>

            <TouchableOpacity style={{
            width:100,
            height:100,
            marginTop:20,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth:1,
            borderRadius:10,
            borderColor:'#AA0A27'
            }}
            onPress={()=>onImagePick()}
            >
                {!image ? (
                        <FontAwesome name="camera-retro" size={50} color="#AA0A27" />
                    ) : (
                        <Image
                            source={{ uri: image }}
                            style={{ width: 100, height: 100, borderRadius:10 }}
                        />
                    )}
            </TouchableOpacity>

            <View>
                <TextInput placeholder='Name'
                onChangeText={(v)=>setName(v)}
                    style={{
                        padding:10,
                        borderWidth:1,
                        borderRadius:5,
                        fontSize:17,
                        backgroundColor:'#FFF',
                        marginTop:10,
                        borderColor:Colors.PRIMARY,
                        fontFamily:'outfit'
                    }}
                />

                <TextInput placeholder='Address'
                onChangeText={(v)=>setAddress(v)}
                    style={{
                        padding:10,
                        borderWidth:1,
                        borderRadius:5,
                        fontSize:17,
                        backgroundColor:'#FFF',
                        marginTop:10,
                        borderColor:Colors.PRIMARY,
                        fontFamily:'outfit'
                    }}
                />

                <TextInput placeholder='Contact'
                onChangeText={(v)=>setContact(v)}
                    style={{
                        padding:10,
                        borderWidth:1,
                        borderRadius:5,
                        fontSize:17,
                        backgroundColor:'#FFF',
                        marginTop:10,
                        borderColor:Colors.PRIMARY,
                        fontFamily:'outfit'
                    }}
                />

                <TextInput placeholder='Website'
                onChangeText={(v)=>setWebsite(v)}
                    style={{
                        padding:10,
                        borderWidth:1,
                        borderRadius:5,
                        fontSize:17,
                        backgroundColor:'#FFF',
                        marginTop:10,
                        borderColor:Colors.PRIMARY,
                        fontFamily:'outfit'
                    }}
                />

                <TextInput placeholder='About'
                onChangeText={(v)=>setAbout(v)}
                multiline
                numberOfLines={5}
                    style={{
                        padding:10,
                        borderWidth:1,
                        borderRadius:5,
                        fontSize:17,
                        backgroundColor:'#FFF',
                        marginTop:10,
                        borderColor:Colors.PRIMARY,
                        fontFamily:'outfit',
                        height:100
                    }}
                />

                <View style={{
                    borderWidth:1,
                    borderRadius:5,
                    fontSize:17,
                    backgroundColor:'#FFF',
                    marginTop:10,
                    borderColor:Colors.PRIMARY,
                }}>
                    <RNPickerSelect
                    onValueChange={(value) => setCategory(value)}
                    items={categoryList}
                    />
                </View>
            </View>

            <TouchableOpacity 
                disabled={loading}
                style={{
                padding:15,
                backgroundColor:Colors.PRIMARY,
                borderRadius:5,
                marginTop:20
                }}
                onPress={()=>onAddNewBusiness()}
            >
            {loading ? 
            <ActivityIndicator size={'large'} color={'#FFF'}/> :
            <Text style={{
                textAlign:'center',
                fontFamily:'outfit',
                color:'#FFF'
            }}>Add New Business</Text>}
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}