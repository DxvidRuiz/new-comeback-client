import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MD3Theme, useTheme } from 'react-native-paper';
import CustomInput from '../../common/buttons/CustomInput';
import AuthContainer from '../../common/containers/AuthContainer';
import { Feather } from '@expo/vector-icons';
import { Formik, useFormik } from 'formik';
import { loginSchema } from '../../validations/yupSchemas/login-schema';
import AuthTitleText from '../../common/text/AuthTitleText';
import { MaterialIcons } from '@expo/vector-icons';
import Input from '../../common/input/input';
import Button from '../../common/buttons/button';
import MediumText from '../../common/text/MediumText';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { apiCallThunk } from '../../redux/thunks/apiCallThunk';
import { loginUserType } from '../../types/loginUserType';
import axios from 'axios';
import { API_ENDPOINTS } from '../../services/api/urlEndpoints/authEnpoint';
import { METOD_E } from '../../types/apiTypes';
import BrandText from '../../common/text/BrandText';
import { SvgUri } from 'react-native-svg';
import { setAccessToken, setAuthentication } from '../../redux/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const myApiState = useSelector((state: RootState) => state.mainReducer.authUser);

  console.log("es autenticado ",myApiState);

  const theme = useTheme();
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {

      const loginRequest = {
        base_url: API_ENDPOINTS.URL_BASE,
        endpoint: API_ENDPOINTS.USER_LOGIN,
        method: METOD_E.POST,
        data: values, // los valores del formulario se pasan directamente
      };

      console.log(loginRequest);


      try {
        const response = await dispatch(
          apiCallThunk(loginRequest // Pasas los valores del formulario directamente
          )
        ).unwrap();
        console.log('Login exitoso:', response);
        dispatch(setAuthentication(true));
        dispatch(setAccessToken(response.token));
      } catch (error) {
        // Verifica si es un error de red y maneja la excepción
        if (!error.response) {
          console.log('Network Error', error);

          setFieldError('submitError', 'Network error: Please check your internet connection and try again.');
        } else {
          // El servidor respondió con un estado fuera del rango 2xx
          const errorMessage = error.response.data.message || 'An unexpected error occurred';
          setFieldError('submitError', errorMessage);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

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
            <AuthTitleText text='Log In' />
          </View>


          <View style={styles.inputContainer}>
            <Input
              label='Email address'
              formik={formik}
              IconLeft={() => <MaterialIcons name='person' color={theme.colors.secondary} size={24} />}
              name='email'
              keyboardType='email-address'
            />

            <Input
              label='Password'
              formik={formik}
              name='password'
              secureTextEntry
              IconRight={() => <MaterialIcons name='remove-red-eye' color={theme.colors.onPrimary} size={24} />}
              IconLeft={() => <MaterialIcons name='lock' color={theme.colors.secondary} size={24} />}
            />

          </View>

          <View style={styles.buttonContainer}>
            <Button
              label='Log In'
              size='medium'
              onPress={formik.handleSubmit}
            />
          </View>
          <View style={styles.registerOption}>
            <MediumText color={theme.colors.onPrimary} text={"Don't have account?"} />
            <TouchableOpacity onPress={() => { }}>
              <MediumText fontWeight={"bold"} color={theme.colors.tertiary} text={"Register"} />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </AuthContainer>
  )
}

export default Login



const style = (theme: MD3Theme) => StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: "center",
      verticalAlign: "center",
    }
    ,
    content: {
      backgroundColor: theme.colors.primary,
    },
    buttonContainer: {
      marginVertical: "10%"
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
      flexDirection: "row",
      marginVertical: 20
    },
    logoContariner: {
      flexDirection: "row",

      width: "100%",
      justifyContent: "center",
      marginVertical: 20

    },
    registerOption: {
      flexDirection: "row",
      alignItems: "center"
    }
  })