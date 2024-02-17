import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { alarmError } from '../../common/Alerts/showMessage';
import Button from '../../common/buttons/CustomButton';
import AuthContainer from '../../common/containers/AuthContainer';
import CustomInput from '../../common/input/customInput';
import Input from '../../common/input/input';
import AuthTitleText from '../../common/text/AuthTitleText';
import MediumText from '../../common/text/MediumText';
import SmallText from '../../common/text/SmallText';
import { loginUser } from '../../redux/actions/auth.actions';
import { setAccessToken } from '../../redux/slices/authSlice';
import { refreshUser } from '../../redux/slices/userSlice';
import { RootState, useAppDispatch } from '../../redux/store/store';
import { AuthNavigationParams } from '../../types/NavigationParams/AuthNavigationParams';
import { loginSchema } from '../../validations/yupSchemas/login-schema';

const initialValues = { email: '', password: '' }
type loginProps = NativeStackNavigationProp<AuthNavigationParams, 'login'>;

const Login = () => {
  const dispatch = useAppDispatch();
  const myApiState = useSelector((state: RootState) => state.auth);
  const [passwordVisibility, setPasswordVisibility] = useState(false);


  const theme = useTheme();
  const { t } = useTranslation()
  const navigation = useNavigation<loginProps>()

  const onSubmit = async (values: typeof initialValues, { setSubmitting, setFieldError }) => {

    dispatch(loginUser(values)).then(response => {
      if (response.meta.requestStatus === 'fulfilled') {

        dispatch(refreshUser(response.payload))
        dispatch(setAccessToken(response.payload))

      }
      if (response.meta.requestStatus == 'rejected') {
        const errorPayload = response.payload as any;
        const errorCode = errorPayload?.message?.status;

        if (errorCode === 404) {
          // Contraseña actual incorrecta

          setFieldError("email", t("error.user_not_found"))
          setSubmitting(false)
          console.log(t("error.user_not_found"));
          // También puedes establecer un error de campo específico si es necesario
          // setFieldError('currentPassword', 'Current password is incorrect');
        } else if (errorCode === 401) {
          // Error en la respuesta con código de estado definido

          setFieldError("password", t("error.incorrect_password"))

          setSubmitting(false)

          // setFieldError('submitError', errorMessage);
        } else {
          // Error en la red
          alarmError({
            duration: 5000,
            title: t("error.network_error"),
          });
        }
      }
    })
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit,
    enableReinitialize: true,

  })

  useEffect(() => {
    if (__DEV__) {
      formik.setValues({
        email: 'dxvid.ruiz2rr@gmail.com',
        password: 'Perla.com+rr555'
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
            <AuthTitleText text={t("actions.login")} />
          </View>


          <View style={styles.inputContainer}>
            <Input
              label={t("label.email")}
              formik={formik}
              IconLeft={() => <MaterialIcons name='person' color={theme.colors.secondary} size={24} />}
              name='email'
              keyboardType='email-address'
            />


            <CustomInput
              label={t("label.password")}
              formik={formik}
              name='password'
              secureTextEntry
              IconLeft={() => <MaterialIcons name='lock' color={theme.colors.secondary} size={24} />}
            />

          </View>

          {/* <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)} style={styles.passwordVisibility}>
            {passwordVisibility ?
              <MaterialIcons name='remove-red-eye' color={theme.colors.onPrimary} size={24} /> :
              <MaterialCommunityIcons name="eye-off" size={24} color="black" />
            }
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.forgotPassword}
            onPress={() => navigation.navigate("passwordRestoreEmail")}
          >

            <SmallText text={t("label.forgot_password")} underline={true} />
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <Button
              label={t("actions.login")}
              size='medium'
              onPress={formik.handleSubmit}
            />
          </View>

          <View style={styles.registerOption}>
            <MediumText color={theme.colors.onPrimary} text={t("label.don`t_have_account")} />
            <TouchableOpacity onPress={() => { navigation.navigate("registerPersonalData") }}>
              <MediumText fontWeight={"bold"} color={theme.colors.tertiary} text={t("actions.register")} />
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
    },
    forgotPassword: {
      alignItems: "flex-start",
    },
    passwordVisibility: {
      alignItems: "flex-end",
    }
  })