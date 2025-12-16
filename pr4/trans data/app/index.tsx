import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

    const handlePlatformSelect = (platform: string) => {
        setSelectedPlatform(platform);
        Alert.alert(
            'Платформа выбрана',
            `Вы выбрали экран для ${platform}`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        if (platform === 'Android') {
                            router.push('/android-screen');
                        } else {
                            router.push('/ios-screen');
                        }
                    },
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.platformBadge}>
                    <Text style={styles.platformText}>
                        Текущая платформа: {Platform.OS === 'ios' ? 'iOS' : 'Android'}
                    </Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Выберите платформу</Text>
                <Text style={styles.sectionDescription}>
                    Каждая платформа имеет свои специфичные компоненты и дизайн-гайды
                </Text>

                <TouchableOpacity
                    style={[styles.platformCard, styles.androidCard]}
                    onPress={() => handlePlatformSelect('Android')}
                >
                    <Text style={styles.platformCardTitle}>Android</Text>
                    <Text style={styles.platformCardSubtitle}>Material Design</Text>
                    <View style={styles.featuresList}>
                        <Text style={styles.featureItem}>DrawerLayoutAndroid</Text>
                        <Text style={styles.featureItem}>ToastAndroid</Text>
                        <Text style={styles.featureItem}>PermissionsAndroid</Text>
                        <Text style={styles.featureItem}>BackHandler</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.platformCard, styles.iosCard]}
                    onPress={() => handlePlatformSelect('iOS')}
                >
                    <Text style={styles.platformCardTitle}>iOS</Text>
                    <Text style={styles.platformCardSubtitle}>Human Interface Guidelines</Text>
                    <View style={styles.featuresList}>
                        <Text style={styles.featureItem}>ActionSheetIOS</Text>
                        <Text style={styles.featureItem}>DatePickerIOS</Text>
                        <Text style={styles.featureItem}>SegmentedControlIOS</Text>
                        <Text style={styles.featureItem}>InputAccessoryView</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Platform API</Text>
                <View style={styles.infoCard}>
                    <Text style={styles.infoText}>OS: {Platform.OS}</Text>
                    <Text style={styles.infoText}>
                        Version: {Platform.Version}
                    </Text>
                    <Text style={styles.infoText}>
                        isPad: {Platform.isPad ? 'true' : 'false'}
                    </Text>
                    <Text style={styles.infoText}>
                        isTV: {Platform.isTV ? 'true' : 'false'}
                    </Text>
                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#6200EE',
        padding: 30,
        paddingTop: 60,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 15,
    },
    platformBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    platformText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    sectionDescription: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        lineHeight: 24,
    },
    platformCard: {
        borderRadius: 15,
        padding: 25,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    androidCard: {
        backgroundColor: '#4CAF50',
    },
    iosCard: {
        backgroundColor: '#2196F3',
    },
    platformCardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    platformCardSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 15,
    },
    featuresList: {
        gap: 8,
    },
    featureItem: {
        fontSize: 14,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    infoSection: {
        padding: 20,
        paddingTop: 0,
    },
    infoTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        gap: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    principleCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#6200EE',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    principleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    principleText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});