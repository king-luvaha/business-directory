import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import BusinessListCard from '../../components/Explore/BusinessListCard'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors'

export default function MyBusiness() {

    const { user } = useUser();
    const [businessList,setBusinessList] = useState([]);
    const [loading,setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTitle:'My Business',
            headerStyle: {
                backgroundColor:Colors.PRIMARY,
            },
            headerTintColor: '#FFF'
        })
        user&&GetUserBusiness()
    },[user])

    // Used to get business list by user email
    const GetUserBusiness = async() => {
        setLoading(true);
        setBusinessList([]);
        const q = query(collection(db,'BusinessList'),
        where('userEmail','==',user?.primaryEmailAddress?.emailAddress));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
        })
        setLoading(false);
    }

  return (
    <View style={{
        padding:20
    }}>
      <FlatList
        data={businessList}
        onRefresh={GetUserBusiness}
        refreshing={loading}
        renderItem={({item,index})=>(
            <BusinessListCard
                business={item}
                key={index}
            />
        )}
      />
    </View>
  )
}