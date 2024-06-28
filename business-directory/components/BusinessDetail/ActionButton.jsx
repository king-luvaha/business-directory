import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet, Alert, Share } from 'react-native';
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

    const handlePress = (item) => {
        if (item.name === 'Share') {
            handleShare();
        } else if (item.url) {
            Linking.canOpenURL(item.url)
                .then((supported) => {
                    if (supported) {
                        Linking.openURL(item.url);
                    } else {
                        Alert.alert('Error', 'Cannot open this URL: ' + item.url);
                    }
                })
                .catch((err) => Alert.alert('Error', err.message));
        } else {
            Alert.alert('Error', 'No URL provided');
        }
    };

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `Check out this business: ${business?.name}\nContact: ${business?.contact}\nAddress: ${business?.address}\nWebsite: ${business?.website}`
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // Shared with activity type of result.activityType
                } else {
                    // Shared
                }
            } else if (result.action === Share.dismissedAction) {
                // Dismissed
            }
        } catch (error) {
            Alert.alert('Error', error.message);
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
                        onPress={() => handlePress(item)}
                        accessibilityLabel={item.name}
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
