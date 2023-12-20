import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const TouchableList = ({ data, onPressItem }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressItem(item)}>
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text>{item.nombre}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default TouchableList;
