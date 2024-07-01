import { View, Text, FlatList, TouchableOpacity, Share } from 'react-native';
import React from 'react';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors';
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function MenuList() {

    const { signOut } = useAuth();

    const menuList = [
        {
            id: 1,
            name: 'Add Business',
            icon: <MaterialIcons name="add-business" size={24} color="#28a745" />,
            path: '/business/add-business'
        },
        {
            id: 2,
            name: 'My Business',
            icon: <Ionicons name="business-outline" size={24} color="#007bff" />,
            path: '/business/my-business'
        },
        {
            id: 3,
            name: 'Share App',
            icon: <Ionicons name="share-social" size={24} color="#fd7e14" />,
            path: 'share'
        },
        {
            id: 4,
            name: 'Logout',
            icon: <MaterialIcons name="logout" size={24} color="#dc3545" />,
            path: 'logout'
        }
    ];

    const router = useRouter();

    const onMenuClick = (item) => {
        if(item.path=='logout'){
            signOut();
            return;
        }
        if(item.path=='share'){
            Share.share(
                {
                    message:'Jamii Business Directory App - https://expo.dev/artifacts/eas/eZ1PkWrygVjy8guits4VwH.apk '
                }
            )
            return;
        }
        router.push(item.path)
    }

    return (
        <View style={{ marginTop: 50 }}>
            <FlatList
                data={menuList}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                    onPress={()=>onMenuClick(item)}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        gap:10,
                        flex:1,
                        padding:10,
                        borderRadius:10,
                        borderWidth:1,
                        margin:10,
                        backgroundColor:'#FFF',
                        borderColor:Colors.PRIMARY
                    }}>
                        {item.icon}
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 16,
                            marginLeft: 10,
                            flex:1
                        }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />

            <Text style={{
                fontFamily:'outfit',
                textAlign:'center',
                marginTop:50,
                color:Colors.GRAY
            }}>
                © 2024 Jamii Business App. All rights reserved.
            </Text>
        </View>
    );
}
