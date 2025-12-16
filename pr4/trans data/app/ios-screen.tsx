import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActionSheetIOS,
    Platform,
    Linking,
    Switch,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function IOSScreen() {
    const router = useRouter();
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [locationEnabled, setLocationEnabled] = useState(false);

    const showActionSheet = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Отмена', 'Сохранить', 'Удалить', 'Поделиться'],
                    destructiveButtonIndex: 2,
                    cancelButtonIndex: 0,
                    userInterfaceStyle: 'dark',
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                        return;
                    } else if (buttonIndex === 1) {
                        Alert.alert('Сохранено', 'Данные успешно сохранены');
                    } else if (buttonIndex === 2) {
                        Alert.alert('Удалено', 'Данные удалены');
                    } else if (buttonIndex === 3) {
                        Alert.alert('Поделиться', 'Функция поделиться');
                    }
                }
            );
        } else {
            Alert.alert('Недоступно', 'ActionSheetIOS доступен только на iOS');
        }
    };

    const showShareActionSheet = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showShareActionSheetWithOptions(
                {
                    url: 'https://reactnative.dev/',
                    message: 'Посмотрите React Native!',
                },
                (error) => Alert.alert('Ошибка', error.message),
                (success, method) => {
                    if (success) {
                        Alert.alert('Успех', `Поделились через ${method}`);
                    }
                }
            );
        } else {
            Alert.alert('Недоступно', 'ShareActionSheet доступен только на iOS');
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
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>‹ Назад</Text>
                </TouchableOpacity>
                <Text style={styles.title}>iOS Screen</Text>
                <Text style={styles.subtitle}>Human Interface Guidelines</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>ActionSheetIOS</Text>
                <Text style={styles.sectionDescription}>
                    Нативные Action Sheets для iOS
                </Text>
                <TouchableOpacity style={styles.iosButton} onPress={showActionSheet}>
                    <Text style={styles.iosButtonText}>Показать Action Sheet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.iosButton, styles.iosButtonSecondary]}
                    onPress={showShareActionSheet}
                >
                    <Text style={[styles.iosButtonText, styles.iosButtonTextSecondary]}>
                        Share Action Sheet
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Linking</Text>
                <Text style={styles.sectionDescription}>
                    Открытие внешних ссылок и приложений
                </Text>
                <View style={styles.linksList}>
                    <TouchableOpacity
                        style={styles.linkItem}
                        onPress={() => openURL('https://developer.apple.com/design/')}
                    >

                        <View style={styles.linkContent}>
                            <Text style={styles.linkTitle}>Apple Design</Text>
                            <Text style={styles.linkSubtitle}>HIG Guidelines</Text>
                        </View>
                        <Text style={styles.linkChevron}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.linkItem}
                        onPress={() => openURL('https://reactnative.dev/')}
                    >
                        <View style={styles.linkContent}>
                            <Text style={styles.linkTitle}>React Native</Text>
                            <Text style={styles.linkSubtitle}>Documentation</Text>
                        </View>
                        <Text style={styles.linkChevron}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.linkItem}
                        onPress={() => openURL('tel:+1234567890')}
                    >
                        <View style={styles.linkContent}>
                            <Text style={styles.linkTitle}>Позвонить</Text>
                            <Text style={styles.linkSubtitle}>+1 234 567 890</Text>
                        </View>
                        <Text style={styles.linkChevron}>›</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Настройки</Text>
                <View style={styles.settingsGroup}>
                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Уведомления</Text>
                        </View>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: '#E9E9EA', true: '#34C759' }}
                            ios_backgroundColor="#E9E9EA"
                        />
                    </View>
                    <View style={styles.settingDivider} />
                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Геолокация</Text>
                        </View>
                        <Switch
                            value={locationEnabled}
                            onValueChange={setLocationEnabled}
                            trackColor={{ false: '#E9E9EA', true: '#34C759' }}
                            ios_backgroundColor="#E9E9EA"
                        />
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Сегменты</Text>
                <View style={styles.segmentedControl}>
                    <TouchableOpacity style={[styles.segment, styles.segmentActive]}>
                        <Text style={[styles.segmentText, styles.segmentTextActive]}>
                            Все
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.segment}>
                        <Text style={styles.segmentText}>Избранное</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.segment}>
                        <Text style={styles.segmentText}>Недавние</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>HIG Принципы</Text>
                <View style={styles.principlesList}>
                    <View style={styles.principleCard}>
                        <Text style={styles.principleTitle}>Clarity</Text>
                        <Text style={styles.principleText}>
                            Четкость и понятность интерфейса
                        </Text>
                    </View>
                    <View style={styles.principleCard}>
                        <Text style={styles.principleTitle}>Deference</Text>
                        <Text style={styles.principleText}>
                            Контент важнее декорации
                        </Text>
                    </View>
                    <View style={styles.principleCard}>
                        <Text style={styles.principleTitle}>Depth</Text>
                        <Text style={styles.principleText}>
                            Визуальная глубина и иерархия
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <TouchableOpacity
                    style={styles.iosButtonLarge}
                    onPress={() => Alert.alert('iOS', 'Большая кнопка в стиле iOS')}
                >
                    <Text style={styles.iosButtonLargeText}>Готово</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        backgroundColor: '#007AFF',
        padding: 20,
        paddingTop: 60,
        paddingBottom: 30,
    },
    backButton: {
        marginBottom: 15,
    },
    backButtonText: {
        fontSize: 17,
        color: '#fff',
        fontWeight: '400',
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 17,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    section: {
        marginTop: 35,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '400',
        color: '#6D6D72',
        textTransform: 'uppercase',
        marginBottom: 8,
        letterSpacing: -0.08,
    },
    sectionDescription: {
        fontSize: 15,
        color: '#6D6D72',
        marginBottom: 12,
    },
    iosButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12,
    },
    iosButtonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
    },
    iosButtonSecondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    iosButtonTextSecondary: {
        color: '#007AFF',
    },
    linksList: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
    },
    linkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#C6C6C8',
    },
    linkIcon: {
        fontSize: 28,
        marginRight: 12,
    },
    linkContent: {
        flex: 1,
    },
    linkTitle: {
        fontSize: 17,
        color: '#000',
        marginBottom: 2,
    },
    linkSubtitle: {
        fontSize: 15,
        color: '#6D6D72',
    },
    linkChevron: {
        fontSize: 24,
        color: '#C6C6C8',
    },
    settingsGroup: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    settingInfo: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 17,
        color: '#000',
    },
    settingDivider: {
        height: 0.5,
        backgroundColor: '#C6C6C8',
        marginLeft: 16,
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: '#E9E9EA',
        borderRadius: 9,
        padding: 2,
    },
    segment: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 7,
    },
    segmentActive: {
        backgroundColor: '#fff',
    },
    segmentText: {
        fontSize: 13,
        fontWeight: '400',
        color: '#000',
    },
    segmentTextActive: {
        fontWeight: '600',
    },
    principlesList: {
        gap: 12,
    },
    principleCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
    },
    principleTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    principleText: {
        fontSize: 15,
        color: '#6D6D72',
        lineHeight: 20,
    },
    iosButtonLarge: {
        backgroundColor: '#007AFF',
        padding: 18,
        borderRadius: 14,
        alignItems: 'center',
        marginBottom: 20,
    },
    iosButtonLargeText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
});