import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function AddBusiness() {

    const navigation = useNavigation();
    const [image,setImage] = useState(null);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'Add New Business',
            headerShown:true,
        })
    },[])

    const onImagePick = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
          setImage(result?.assets[0].uri);
          console.log(result);
    }

  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25
      }}>AddBusiness</Text>
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

        <TextInput placeholder='Email'
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
      </View>
    </View>
  )
}