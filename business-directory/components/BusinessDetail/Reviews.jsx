import { View, Text, TextInput, TouchableOpacity, ToastAndroid, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { Rating } from 'react-native-ratings';
import { Colors } from '../../constants/Colors';
import { db } from '../../configs/FirebaseConfig';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';

export default function Reviews({ business }) {
    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState('');
    const { user } = useUser();

    const onSubmit = async () => {
        const docRef = doc(db, 'BusinessList', business?.id);
        await updateDoc(docRef, {
            reviews: arrayUnion({
                rating: rating,
                comment: userInput,
                userName: user?.fullName,
                userImage: user?.imageUrl,
                userEmail: user?.primaryEmailAddress?.emailAddress
            })
        });

        ToastAndroid.show('Comment Added Successfully!', ToastAndroid.SHORT);
        setUserInput(''); // Clear the input after submission
    };

    return (
        <View style={{ padding: 20, backgroundColor: '#FFF' }}>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>Reviews</Text>

            <View>
                <Rating
                    showRating={false}
                    imageSize={20}
                    onFinishRating={setRating}
                    style={{ paddingVertical: 10 }}
                />

                <TextInput
                    placeholder='Write your comment'
                    numberOfLines={4}
                    value={userInput}
                    onChangeText={setUserInput}
                    style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        borderColor: Colors.GRAY,
                        textAlignVertical: 'top'
                    }}
                />
                <TouchableOpacity
                    disabled={!userInput}
                    onPress={onSubmit}
                    style={{
                        padding: 10,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 6,
                        marginTop: 10
                    }}
                >
                    <Text style={{ fontFamily: 'outfit', color: '#FFF', textAlign: 'center' }}>Submit</Text>
                </TouchableOpacity>
            </View>

            {/* Display Previous Reviews */}

            <FlatList
                data={business?.reviews}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                        padding: 10,
                        borderWidth: 1,
                        borderColor: Colors.GRAY,
                        borderRadius: 15,
                        marginTop: 10
                    }}>
                        <Image source={{ uri: item.userImage }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 99
                            }}
                        />
                        <View style={{ flex: 1, gap:5 }}>
                            <Text style={{ fontFamily: 'outfit-medium' }}>{item.userName}</Text>
                            <Rating
                                imageSize={10}
                                readonly
                                startingValue={item.rating}
                                style={{ alignItems: 'flex-start' }}
                            />
                            <Text numberOfLines={3} ellipsizeMode='tail' style={{ fontFamily: 'outfit', marginTop: 5 }}>{item.comment}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}
