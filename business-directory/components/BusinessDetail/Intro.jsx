import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Intro({business}) {

    const router = useRouter();
    const { user } = useUser();
    const onDelete = () => {
      Alert.alert('Confirm Deletion','Are you sure you want to delete this business? This action cannot be undone.',[
        {
          text:'Cancel',
          style:'cancel'
        },
        {
          text:'Delete',
          style:'destructive',
          onPress: () => deleteBusiness()
        }
      ])
    }

    const deleteBusiness = async() => {
      console.log("Delete Business");
      await deleteDoc(doc(db,'BusinessList',business?.id));
      router.back();
      ToastAndroid.show('Business Deleted!',ToastAndroid.LONG)
    }
  return (
    <View>
        <View style={{
            position:'absolute',
            zIndex:10,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            width:'100%',
            padding:10,
            marginTop:20,
        }}>
            <TouchableOpacity onPress={()=>router.back()}>
                <Ionicons name="arrow-back-circle" size={40} color="#F5E5E9" />
            </TouchableOpacity>
            <Ionicons name="heart-outline" size={40} color="#F5E5E9" />
        </View>
      <Image source={{uri:business?.imageUrl}}
        style={{
            width:'100%',
            height:340
        }}
      />

        <View style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          padding:20,
          marginTop:-20,
          backgroundColor:'#fff',
          borderTopLeftRadius:25,
          borderTopRightRadius:25,
        }}>
          <View style={{
            padding:20,
            marginTop:-20,
            backgroundColor:'#FFF',
            borderTopLeftRadius:15,
            borderTopRightRadius:15,
          }}>
            <Text style={{
                fontSize:26,
                fontFamily:'outfit-bold'
            }}>{business?.name}
            
            </Text>
            <Text style={{
                fontFamily:'outfit',
                fontSize:18
            }}>{business?.address}</Text>
          </View>

          { user?.primaryEmailAddress?.emailAddress == business?.userEmail && <TouchableOpacity onPress={()=>onDelete()}>
            <Ionicons name="trash" size={24} color="#AA0A27" />
          </TouchableOpacity>}
        </View>
    </View>
  )
}