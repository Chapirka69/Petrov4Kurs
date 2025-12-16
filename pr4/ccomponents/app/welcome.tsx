import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function WelcomeScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();

    const { userName, userEmail, loginType } = params as {
        userName: string;
        userEmail: string;
        loginType: string;
    };

    const getCurrentTime = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Доброе утро';
        if (hour < 18) return 'Добрый день';
        return 'Добрый вечер';
    };

    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1200' }}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.container}>
                        <View style={styles.welcomeCard}>
                            <Text style={styles.greeting}>{getCurrentTime()}</Text>
                            <Text style={styles.userName}>{userName}</Text>

                            <View style={styles.divider} />

                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Тип входа:</Text>
                                <Text style={styles.infoValue}>{loginType}</Text>
                            </View>

                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Email:</Text>
                                <Text style={styles.infoValue}>{userEmail}</Text>
                            </View>

                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Дата:</Text>
                                <Text style={styles.infoValue}>
                                    {new Date().toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </Text>
                            </View>

                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Время:</Text>
                                <Text style={styles.infoValue}>
                                    {new Date().toLocaleTimeString('ru-RU', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.messageCard}>
                            <Text style={styles.messageTitle}>Успешно!</Text>
                            <Text style={styles.messageText}>
                                {loginType} прошла успешно. Добро пожаловать в систему!
                            </Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.profileButton]}
                                onPress={() => router.push('/')}
                            >
                                <Text style={styles.buttonText}>На главную</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.logoutButton]}
                                onPress={() => router.push('/')}
                            >
                                <Text style={styles.buttonText}>Выйти</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    container: {
        width: '100%',
    },
    welcomeCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 20,
        padding: 30,
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    greeting: {
        fontSize: 24,
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    userName: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 20,
    },
    infoSection: {
        marginBottom: 15,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    infoValue: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
    },
    messageCard: {
        backgroundColor: 'rgba(92, 184, 92, 0.95)',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    messageTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
    },
    messageText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 24,
    },
    buttonContainer: {
        gap: 15,
    },
    button: {
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    profileButton: {
        backgroundColor: '#4A90E2',
    },
    logoutButton: {
        backgroundColor: '#757575',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});