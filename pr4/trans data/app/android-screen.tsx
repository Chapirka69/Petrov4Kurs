import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
    ToastAndroid,
    Platform,
    Linking,
    Switch,
    PermissionsAndroid,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function AndroidScreen() {
    const router = useRouter();
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const showToast = () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show('Это Android Toast сообщение!', ToastAndroid.SHORT);
        } else {
            Alert.alert('Toast', 'Toast доступен только на Android');
        }
    };

    const showLongToast = () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show('Длинное Toast сообщение', ToastAndroid.LONG);
        }
    };

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Доступ к камере',
                        message: 'Приложению нужен доступ к камере',
                        buttonNeutral: 'Спросить позже',
                        buttonNegative: 'Отмена',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    showToast();
                    Alert.alert('Успех', 'Разрешение получено');
                } else {
                    Alert.alert('Отказано', 'Разрешение не получено');
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            Alert.alert('Недоступно', 'PermissionsAndroid доступен только на Android');
        }
    };

    const openURL = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('Ошибка', `Не удается открыть URL: ${url}`);
        }
    };

    return (
        <ScrollView style={[styles.container, darkMode && styles.containerDark]}>
            <View style={[styles.header, darkMode && styles.headerDark]}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Android Screen</Text>
                <Text style={styles.subtitle}>Material Design Components</Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, darkMode && styles.textDark]}>
                    ToastAndroid
                </Text>
                <Text style={[styles.sectionDescription, darkMode && styles.textDark]}>
                    Нативные Toast-уведомления для Android
                </Text>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.materialButton} onPress={showToast}>
                        <Text style={styles.materialButtonText}>Short Toast</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.materialButton} onPress={showLongToast}>
                        <Text style={styles.materialButtonText}>Long Toast</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, darkMode && styles.textDark]}>
                    PermissionsAndroid
                </Text>
                <Text style={[styles.sectionDescription, darkMode && styles.textDark]}>
                    Запрос разрешений на Android
                </Text>
                <TouchableOpacity
                    style={styles.materialButtonOutlined}
                    onPress={requestCameraPermission}
                >
                    <Text style={styles.materialButtonOutlinedText}>
                        Запросить доступ к камере
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, darkMode && styles.textDark]}>
                    Linking
                </Text>
                <Text style={[styles.sectionDescription, darkMode && styles.textDark]}>
                    Открытие внешних ссылок и приложений
                </Text>
                <View style={styles.linksList}>
                    <TouchableOpacity
                        style={styles.linkItem}
                        onPress={() => openURL('https://material.io/')}
                    >

                        <Text style={styles.linkText}>Материальный дизайн</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.linkItem}
                        onPress={() => openURL('https://developer.android.com/')}
                    >
                        <Text style={styles.linkText}>Android разработчики</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.linkItem}
                        onPress={() => openURL('mailto:support@example.com')}
                    >
                        <Text style={styles.linkText}>Отправить Email</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, darkMode && styles.textDark]}>
                    Настройки
                </Text>
                <View style={[styles.settingItem, darkMode && styles.cardDark]}>
                    <View style={styles.settingInfo}>
                        <Text style={[styles.settingTitle, darkMode && styles.textDark]}>
                            Уведомления
                        </Text>
                        <Text style={[styles.settingDescription, darkMode && styles.textDark]}>
                            Получать push-уведомления
                        </Text>
                    </View>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                        trackColor={{ false: '#767577', true: '#4CAF50' }}
                        thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
                    />
                </View>

                <View style={[styles.settingItem, darkMode && styles.cardDark]}>
                    <View style={styles.settingInfo}>
                        <Text style={[styles.settingTitle, darkMode && styles.textDark]}>
                            Темная тема
                        </Text>
                        <Text style={[styles.settingDescription, darkMode && styles.textDark]}>
                            Использовать темный режим
                        </Text>
                    </View>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        trackColor={{ false: '#767577', true: '#4CAF50' }}
                        thumbColor={darkMode ? '#fff' : '#f4f3f4'}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, darkMode && styles.textDark]}>
                    Material Design Принципы
                </Text>
                <View style={[styles.principleCard, darkMode && styles.cardDark]}>
                    <Text style={[styles.principleTitle, darkMode && styles.textDark]}>
                        Material You
                    </Text>
                    <Text style={[styles.principleText, darkMode && styles.textDark]}>
                        Адаптивный дизайн под пользователя
                    </Text>
                </View>
                <View style={[styles.principleCard, darkMode && styles.cardDark]}>
                    <Text style={[styles.principleTitle, darkMode && styles.textDark]}>
                        Elevation
                    </Text>
                    <Text style={[styles.principleText, darkMode && styles.textDark]}>
                        Использование теней для глубины
                    </Text>
                </View>
                <View style={[styles.principleCard, darkMode && styles.cardDark]}>
                    <Text style={[styles.principleTitle, darkMode && styles.textDark]}>
                        Motion
                    </Text>
                    <Text style={[styles.principleText, darkMode && styles.textDark]}>
                        Плавные и осмысленные анимации
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.fabButton}
                onPress={() => Alert.alert('FAB', 'Floating Action Button нажата')}
            >
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    containerDark: {
        backgroundColor: '#121212',
    },
    header: {
        backgroundColor: '#4CAF50',
        padding: 20,
        paddingTop: 60,
    },
    headerDark: {
        backgroundColor: '#1F1F1F',
    },
    backButton: {
        marginBottom: 10,
    },
    backButtonText: {
        fontSize: 32,
        color: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    textDark: {
        color: '#E0E0E0',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
    },
    materialButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 2,
    },
    materialButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    materialButtonOutlined: {
        backgroundColor: 'transparent',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#4CAF50',
    },
    materialButtonOutlinedText: {
        color: '#4CAF50',
        fontSize: 16,
        fontWeight: '600',
    },
    linksList: {
        gap: 10,
    },
    linkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        elevation: 1,
    },
    linkIcon: {
        fontSize: 24,
        marginRight: 15,
    },
    linkText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 1,
    },
    cardDark: {
        backgroundColor: '#1F1F1F',
    },
    settingInfo: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 14,
        color: '#666',
    },
    principleCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
        elevation: 1,
    },
    principleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    principleText: {
        fontSize: 14,
        color: '#666',
    },
    fabButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabIcon: {
        fontSize: 32,
        color: '#fff',
        fontWeight: '300',
    },
});