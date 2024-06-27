import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../configs/FirebaseConfig'
import { collection, getDocs, query } from 'firebase/firestore';

export default function Slider() {

    const [sliderList,setSliderList] = useState([]);

    useEffect(()=>{
        GetSliderList();
    },[]);

    const GetSliderList = async() => {
        setSliderList([]);
        const q = query(collection(db,'Slider'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setSliderList(prev=>[...prev,doc.data()]);
        })
    }

  return (
    <View>
        <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20,
        paddingLeft:20,
        paddingTop:20,
        marginBottom:5
      }}>
            #Advert
        </Text>

        <FlatList
            data={sliderList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingLeft:20}}
            renderItem={({item,index})=>(
                <Image source={{uri:item.imageUrl}}
                style={{
                    width:300,
                    height:150,
                    borderRadius:15,
                    marginRight:15
                }}
                />
            )}
        />
    </View>
  )
}