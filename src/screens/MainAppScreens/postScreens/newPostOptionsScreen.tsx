import { FontAwesome } from '@expo/vector-icons';

import { useIsFocused, useNavigation } from '@react-navigation/native'; // Importa useIsFocused
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { MainNavigationProps } from '../../../types/NavigationParams/MainNavigationParams';

// type newPostOptionProps = NativeStackNavigationProp<NewPostNavigationProps, 'newPostGalleryPicker'>;
type postNavigaton = NativeStackNavigationProp<MainNavigationProps, 'newPostNavigation'>;



const NewPostOptionsScreen = () => {

  const theme = useTheme();

  const [isListVisible, setListVisible] = useState(false);
  const translateY = new Animated.Value(200); // Valor inicial fuera de la pantallaS
  const isFocused = useIsFocused(); // Verifica si la pantalla está enfocada
  const { t } = useTranslation()
  const navigation = useNavigation<any>()
  useEffect(() => {
    if (isFocused) {
      // Ejecuta la animación para mostrar la lista
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // Restablece el valor de translateY cuando la pantalla pierde el foco
      translateY.setValue(200);
    });

    return unsubscribe;
  }, [navigation]);

  const styles = style(theme)

  return (
    <View style={styles.container}>

      <Animated.View style={[styles.animatedList, { transform: [{ translateY }] }]}>
        <View style={styles.optionsContaier}>
          <View style={styles.title}><Text style={styles.titleText} >{t("option.new_post")}</Text></View>

          {/* <TouchableOpacity style={styles.option} onPress={() => postOptionNav.navigate("postCameraComponent")}> */}
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('newPostNavigation', { screen: 'postCameraComponent' })}>
            <FontAwesome name="camera" size={24} color={theme.colors.onPrimary} />
            <Text style={styles.text}>{t("actions.camera")}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("newPost")}> */}
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("newPostNavigation", { screen: "newPost" })}>
            <FontAwesome name="image" size={24} color={theme.colors.onPrimary} />
            <Text style={styles.text}>{t("actions.gallery")}</Text>
          </TouchableOpacity>
          {/* Otras opciones de la lista */}
        </View>
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
    width: '100%',
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    padding: 10,

    // borderTopWidth: 1,
    // borderTopColor: '#ccc',
  },
  optionsContaier: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 80


  },

  title: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50

  },
  titleText: { fontSize: 20, color: theme.colors.onPrimary },
  text: {
    fontSize: 16,
    color: theme.colors.onPrimary
  },
  option: {
    padding: 15,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
    gap: 10

  },
});

export default NewPostOptionsScreen;
