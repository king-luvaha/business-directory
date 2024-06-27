import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ActionButton({ business }) {
    const actionButtonMenu = [
        {
            id: 1,
            name: 'Call',
            icon: 'call',
            url: 'tel:' + business?.contact
        },
        {
            id: 2,
            name: 'Location',
            icon: 'location',
            url: 'https://www.google.com/maps/search/?api=1&query=' + business?.address
        },
        {
            id: 3,
            name: 'Web',
            icon: 'globe',
            url: business?.website
        },
        {
            id: 4,
            name: 'Share',
            icon: 'share-social',
            url: ''
        }
    ];

    const handlePress = (url) => {
        if (url) {
            Linking.openURL(url);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={actionButtonMenu}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => handlePress(item.url)}
                    >
                        <View style={styles.iconContainer}>
                            <Ionicons name={item.icon} size={24} color="#AA0A27" />
                        </View>
                        <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        padding: 20,
    },
    button: {
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: 25,
    },
    iconContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 50,
        padding: 15,
        marginBottom: 5,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
    }
});
