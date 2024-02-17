import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';

const NewPostOptionsScreen = () => {
  const theme = useTheme();
  const styles = style(theme);

  const [isListVisible, setListVisible] = useState(false);
  const translateY = new Animated.Value(200); // Valor inicial fuera de la pantalla

  useEffect(() => {
    // Animación al cargar la pantalla para mostrar la lista
    Animated.timing(translateY, {
      toValue: 0,
      duration: 600, // Duración de la animación en milisegundos
      useNativeDriver: true,
    }).start(() => setListVisible(true));
  }, []); // El array vacío significa que este efecto solo se ejecuta una vez al montar el componente



  return (
    <View style={styles.container}>
      {/* Contenido principal */}

      {/* Lista animada */}
      <Animated.View style={[styles.animatedList, { transform: [{ translateY }] }]}>
        <TouchableOpacity onPress={() => console.log('Nueva publicación')}>
          <Text>Nueva publicación</Text>
        </TouchableOpacity>
        {/* Otras opciones de la lista */}
      </Animated.View>
    </View>
  );
};

const style = (theme: MD3Theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedList: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default NewPostOptionsScreen;
