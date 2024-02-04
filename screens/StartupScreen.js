import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, ImageBackground, Image } from 'react-native';
import { Button } from 'react-native-paper';

function StartupScreen({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <ImageBackground 
            source={require('../assets/startup.png')} 
            style={{flex: 1}}
            resizeMode="cover" // Cover the whole screen
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {/* Animated logo image */}
                <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('../assets/logo.png')} // Update the path to your logo image
                        style={{ width: 100, height: 100 }} // Adjust the size as needed
                    />
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>
                        Welcome to My App
                    </Text>
                </Animated.View>
                <Button onPress={() => navigation.navigate('Register')} mode="contained" style={{ marginTop: 20 }}>
                    Get Started
                </Button>
            </View>
        </ImageBackground>
    );
}

export default StartupScreen;

