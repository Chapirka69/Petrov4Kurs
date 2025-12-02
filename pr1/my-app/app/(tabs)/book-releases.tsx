import React from 'react';
import { View, Text } from 'react-native';

export default function BookReleases() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'powderblue', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center' }}>5 книжных новинок октября</Text>
      </View>

      <View style={{ flex: 2, backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center' }}>«Кадиш.com» Натан Ингландер. Издательство «Книжники»</Text>
      </View>

      <View style={{ flex: 3, backgroundColor: 'steelblue', alignItems: 'center', justifyContent: 'center' }} > 
        <Text style={{ textAlign: 'center' }}>
          Ироничная новелла Натана Ингландера. две личные истории культовой Патти Смит, репортаж британской журналистки о будущем человечества. Дебютный роман Оушена Вуонга и журналистское расследование о создании "Моссада". В нашей подборке рассказываем о пяти захватывающих книжных новинках. которые достойны того, чтобы появиться на ваших полках
        </Text>
      </View>

    </View>
  );
}
    
