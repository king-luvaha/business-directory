import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function PopularBusinessCard({business}) {
  return (
    <View style={{
        marginLeft:29,
        padding:10,
        backgroundColor:'#FFF',
        borderRadius:2
    }}>
      <Image source={{uri:business?.imageUrl}}
        style={{
            width:200,
            height:130,
            borderRadius:2
        }}
      />
      <View style={{marginTop:7, width:200}}>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:17,
        }}>{business.name}</Text>

        <Text style={{
            fontFamily:'outfit',
            fontSize:13,
            color:Colors.GRAY,
        }}>{business.address}</Text>

        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'
        }}>
            <View style={{display:'flex',flexDirection:'row',gap:10}}>
                <Image source={require('./../../assets/images/star.png')}
                    style={{
                        width:15,
                        height:15,
                        marginTop:10
                    }}
                />
                <Text style={{fontFamily:'outfit', marginTop:10}}>4</Text>
            </View>
            <Text
                style={{
                    fontFamily:'outfit',
                    backgroundColor:Colors.ICON_BG,
                    color:'#000',
                    padding:7,
                    fontSize:12,
                    borderRadius:5,
                }}
            >{business.category}</Text>
        </View>
      </View>
    </View>
  )
}