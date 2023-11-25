import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MD3Theme, useTheme } from 'react-native-paper';
import AuthContainer from '../../common/containers/AuthContainer';
import AuthTitleText from '../../common/text/AuthTitleText';
import Button from '../../common/buttons/button';
import MediumText from '../../common/text/MediumText';
import { useDispatch } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import SmallText from '../../common/text/SmallText';
import RegisterPersonalData from './RegisterPersonalData';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../types/types';



type AuthNavigationProp = NativeStackNavigationProp<RootStackParams, 'welcome'>;

const Welcome = () => {

  const navigation = useNavigation<AuthNavigationProp>()
  const theme = useTheme();

  //  styles ------------------------------------------------------- 
  const styles = style(theme)

  return (

    <AuthContainer>
      <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.content} >
          <View style={styles.logoContariner}>
            <Image style={{ height: 120, width: 120 }} source={require("../../../assets/finallogo200(1).png")} />
          </View>
          <View style={styles.titleContariner}>
            <AuthTitleText text='Hi there!' />
          </View>
          <View style={styles.titleContariner}>
            <MediumText text='The app for your pet is here, say hello!' />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              label='Log in'
              size='medium'
              onPress={() => navigation.navigate("login")}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              label='Create new account'
              size='medium'
              onPress={() => navigation.navigate("registerPersonalData")}
              color="success"
            />
          </View>
          <View style={styles.termsOption}>
            <TouchableOpacity onPress={() => {
              
            }}>
              <SmallText text='Terms and conditions' />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </AuthContainer>
  )
}

export default Welcome



const style = (theme: MD3Theme) => StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: "flex-end",
      verticalAlign: "center",
    }
    ,
    content: {
      backgroundColor: theme.colors.primary,
    },
    buttonContainer: {
      marginVertical: 12
    }
    ,
    inputContainer: {
      marginVertical: "2%",
      gap: 8
    },
    input: {
      backgroundColor: theme.colors.surface
    },
    button: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.onSecondary
    },
    titleContariner: {
      marginBottom: 20
    },
    logoContariner: {
      flexDirection: "row",

      width: "100%",
      justifyContent: "center",
      marginBottom: 150

    },
    termsOption: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",

      marginTop: 40
    }
  })