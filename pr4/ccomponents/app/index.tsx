import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200' }}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Добро пожаловать</Text>
                    <Text style={styles.subtitle}>Начните свое путешествие</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.loginButton]}
                            onPress={() => router.push('/login')}
                        >
                            <Text style={styles.buttonText}>Войти</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.registerButton]}
                            onPress={() => router.push('/register')}
                        >
                            <Text style={styles.buttonText}>Регистрация</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '85%',
        alignItems: 'center',
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 50,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        gap: 15,
    },
    button: {
        paddingVertical: 18,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    loginButton: {
        backgroundColor: '#4A90E2',
    },
    registerButton: {
        backgroundColor: '#5CB85C',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});