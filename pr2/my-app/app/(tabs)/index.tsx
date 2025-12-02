import React, { useRef, useEffect } from 'react';
import { SafeAreaView, Text, View, Animated, useWindowDimensions, Button, Image, StatusBar, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//задание 2 лаунчскрин
const LaunchScreen = ({ navigation }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.replace('Home');
      }, 1000);
    });
  }, []);

  return (
    // Анимированный контейнер с затуханием
    <Animated.View style={{ flex: 1, backgroundColor: '#4c669f', justifyContent: 'center', alignItems: 'center', opacity: fadeAnim }}>
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={{ width: 120, height: 120 }}
      />
      <Text style={{ marginTop: 20, fontSize: 32, fontWeight: 'bold', color: 'white' }}>Моё Приложение</Text>
    </Animated.View>
  );
};

//задание 1: Первый экран с навигацией
const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 30 }}>Главная</Text>
      <Button 
        title="Перейти в Галерею"
        onPress={() => navigation.navigate('Gallery')}
      />
      <View style={{ marginVertical: 10 }} />
      <Button      
        title="Перейти в Контакты"
        onPress={() => navigation.navigate('Contacts')}
      />
    </View>
  );
};

//задание 2 слайдер
const GalleryScreen = ({ navigation }: any) => {
  const images = [
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    'https://images.unsplash.com/photo-1519985176271-45e6e5b9d05a',
    'https://images.unsplash.com/photo-1556742212-36f9c2d25c9b',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const sliderHeight = windowWidth < 768 ? windowWidth * 0.7 : Math.min(windowHeight * 0.6, 500);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />

      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', margin: 20 }}>Галерея</Text>

      <View style={{ height: sliderHeight, marginBottom: 20 }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={1}
        >
          {images.map((image, index) => (
            <View
              key={index}
              style={{
                width: windowWidth,
                height: sliderHeight,
                paddingHorizontal: 16,
              }}
            >
              <View style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0', borderRadius: 12, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={{ uri: image }}
                  style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
          {images.map((_, index) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (index - 1),
                windowWidth * index,
                windowWidth * (index + 1),
              ],
              outputRange: [8, 20, 8],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={index}
                style={{ height: 8, borderRadius: 4, backgroundColor: '#888', marginHorizontal: 4, width }}
              />
            );
          })}
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <Button title="Назад" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

// задание1 список контактов
const ContactsScreen = ({ navigation }: any) => {
  const contacts = ['Анна', 'Борис', 'Вика', 'Дима', 'Егор'];

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 30 }}>Контакты</Text>
      {contacts.map((name, i) => (
        <View key={i} style={{ padding: 15, backgroundColor: 'white', borderRadius: 10, marginVertical: 5, width: '80%', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
          <Text style={{ fontSize: 18 }}>{name}</Text>
        </View>
      ))}
      <Button title="На главную" onPress={() => navigation.popToTop()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function HomeTabStack() {
  return (
    <Stack.Navigator initialRouteName="Launch">
      <Stack.Screen
        name="Launch"
        component={LaunchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Главная' }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{ title: 'Галерея' }}
      />
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ title: 'Контакты' }}
      />
    </Stack.Navigator>
  );
}