import { MaterialIcons } from '@expo/vector-icons';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Button from '../../common/buttons/CustomButton';
import AuthContainer from '../../common/containers/AuthContainer';
import Input from '../../common/input/input';
import AuthTitleText from '../../common/text/AuthTitleText';
import MediumText from '../../common/text/MediumText';
import { loginUser } from '../../redux/actions/auth.actions';
import { refreshUser } from '../../redux/slices/userSlice';
import { RootState, useAppDispatch } from '../../redux/store/store';
import { loginSchema } from '../../validations/yupSchemas/login-schema';

const initialValues = { email: '', password: '' }

const Login = () => {
  const dispatch = useAppDispatch();
  const myApiState = useSelector((state: RootState) => state.auth);


  const theme = useTheme();

  const onSubmit = async (values: typeof initialValues, { setSubmitting, setFieldError }) => {

    dispatch(loginUser(values)).then(response => {
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(refreshUser(response.payload))


      }
      if (response.meta.requestStatus == 'rejected') {
        const data = response.payload as any;

        if (!data.response) {
          setFieldError('submitError', 'Network error: Please check your internet connection and try again.');
        } else {
          const errorMessage = data.message || 'An unexpected error occurred';
          setFieldError('submitError', errorMessage);
        }
      }
    })
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit,
    enableReinitialize: true
  })

  useEffect(() => {
    if (__DEV__) {
      formik.setValues({
        email: 'ooooo@example.com',
        password: 'Contraseñaperla1#'
      })
    }
  }, [])




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