import * as ImageManipulator from 'expo-image-manipulator';
import React, { useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const EFFECTS = [
  { id: '1', name: 'Normal', icon: 'ios-image' },
  { id: '2', name: 'Espejo', icon: 'ios-swap-horizontal' },
  // Puedes agregar más efectos aquí como plantilla, aunque expo-image-manipulator tiene limitaciones.
];

const ImageEditor = ({ imageUrl }) => {
  const [editedImage, setEditedImage] = useState(imageUrl);

  const applyEffect = async (effectName) => {
    if (effectName === 'Espejo') {
      try {
        const manipulatedResult = await ImageManipulator.manipulateAsync(
          imageUrl,
          [{ flip: ImageManipulator.FlipType.Horizontal }],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        setEditedImage(manipulatedResult.uri);
      } catch (error) {
        Alert.alert('Error', 'No se pudo aplicar el efecto a la imagen.');
      }
    } else {
      // Para 'Normal' o cualquier otro efecto que resetee a la imagen original.
      setEditedImage(imageUrl);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: editedImage }} style={styles.image} resizeMode="cover" />
      <FlatList
        horizontal
        data={EFFECTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.effectButton} onPress={() => applyEffect(item.name)}>
            {/* <Ionicons name={item.icon} size={24} color="black" /> */}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.effectsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  effectsList: {
    paddingHorizontal: 10,
  },
  effectButton: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImageEditor;
