import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useCallback } from 'react'
import * as WebBrowser from 'expo-web-browser';
import { Colors } from '@/constants/Colors'
import { useWarmUpBrowser } from './../hooks/useWarmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onPress = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Handle case where no session is created
            }
        } catch (err) {
            console.error("OAuth error", err);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [startOAuthFlow]);

    return (
        <ScrollView>
            <View>
                <View style={styles.imageContainer}>
                    <Image source={require('./../assets/images/Loginpic.png')} style={styles.image} />
                </View>

                <View style={styles.subContainer}>
                    <Text style={styles.title}>
                        Your
                        <Text style={styles.highlightedText}> Jamii Business Directory App</Text>
                    </Text>
                    <Text style={styles.subtitle}>
                        Find your favorite business near you and post your own business to your community
                    </Text>

                    {error && <Text style={styles.errorText}>{error}</Text>}

                    <TouchableOpacity style={styles.btn} onPress={onPress} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.btnText}>Let's Get Started</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 50,
    },
    image: {
        width: 230,
        height: 470,
    },
    subContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -20,
    },
    title: {
        fontSize: 30,
        fontFamily: 'outfit-bold',
        textAlign: 'center',
    },
    highlightedText: {
        color: Colors.PRIMARY,
    },
    subtitle: {
        fontSize: 15,
        fontFamily: 'outfit',
        textAlign: 'center',
        marginVertical: 15,
        color: Colors.GRAY,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    btn: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 99,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'outfit',
    },
})

export default LoginScreen
