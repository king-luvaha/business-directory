import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinessDetail/Intro';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';
import Reviews from '../../components/BusinessDetail/Reviews';

export default function BusinessDetail() {
    const { businessid } = useLocalSearchParams();
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getBusinessDetailById();
    }, []);

    // Function to fetch business details
    const getBusinessDetailById = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, 'BusinessList', businessid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setBusiness({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error('Error fetching business details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
            {/* Intro */}
            <Intro business={business} />

            {/* Action Buttons */}
            <ActionButton business={business} />

            {/* About Section */}
            <About business={business} />

            {/* Review Section */}
            {business && (
                <View style={{ flex: 1 }}>
                    <Reviews business={business} />
                </View>
            )}
        </ScrollView>
    );
}
