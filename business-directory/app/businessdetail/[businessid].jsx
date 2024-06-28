import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinessDetail/Intro';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';
import Reviews from '../../components/BusinessDetail/Reviews';

export default function BusinessDetail() {

    const { businessid } = useLocalSearchParams();
    const [business,setBusiness] = useState();
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        GetBusinessDetailById();
    },[])

    // Used to get BusinessDetail by Id
    const GetBusinessDetailById = async () => {
        
        const docRef = doc(db,'BusinessList',businessid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setBusiness({id:docSnap.id,...docSnap.data()});
            setLoading(false);
        } else {
            console.log("No such document!");
            setLoading(false)
        }

    }

  return (
    <ScrollView>
      {loading?
      <ActivityIndicator
        style={{
            marginTop:'80%'
        }}
        size={'large'}
        color={Colors.PRIMARY}
      /> : 
      <View>
        {/* Intro */}
            <Intro business={business}/>
        {/* Action Buttons */}
            <ActionButton business={business}/>
        {/* About Section */}
            <About business={business}/>
        {/* Review Section */}
            <Reviews business={business}/>
      </View>
    }
    </ScrollView>
  )
}