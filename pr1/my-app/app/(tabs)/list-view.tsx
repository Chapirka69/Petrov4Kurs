import {Text, ScrollView, View, TextInput, Button, FlatList } from 'react-native'

export default function ListViewScreen() {
  //1 хзаголовок с информацией
  const renderHeader = () => (
    <View style={{ backgroundColor: 'skyblue', padding: 15, marginBottom: 15 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Каталог книг</Text>
      <Text style={{ fontSize: 12, color: 'white', marginTop: 5 }}>Лучшие классические произведения</Text>
    </View>
  )

  // 2 п оле для поиска
  const renderSearchBox = () => (
    <View style={{ backgroundColor: 'white', padding: 15, marginBottom: 15, borderRadius: 8 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>Поиск:</Text>
      <TextInput
        placeholder="Введите название..."
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 5 }}
        placeholderTextColor="gray"/>
    </View>
  )

  //3 список книг FlatList
  const books = [
    { id: '1', name: 'Война и мир' },
    { id: '2', name: 'Преступление и наказание' },
    { id: '3', name: 'Мастер и Маргарита' },
    { id: '4', name: 'Анна Каренина' },
    { id: '5', name: 'Идиот' },
  ]

  const renderBooks = ({ item }: any) => (
    <View style={{ backgroundColor: '#f0f0f0', padding: 12, marginBottom: 8, borderRadius: 5 }}>
      <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
    </View>
  )

  const renderList = () => (
    <View style={{ backgroundColor: 'white', padding: 15, marginBottom: 15, borderRadius: 8 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>Список книг:</Text>
      <FlatList
        data={books}
        renderItem={renderBooks}
        scrollEnabled={false}/>
    </View>
  )

  // 4 кнопа
  const renderButton = () => (
    <View style={{ backgroundColor: 'white', padding: 15, marginBottom: 15, borderRadius: 8 }}>
      <Button title="Добавить книгу"/>
    </View>
  )

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView style={{ padding: 10 }}>
        {renderHeader()}
        {renderSearchBox()}
        {renderList()}
        {renderButton()}
      </ScrollView>
    </View>
  )
}

