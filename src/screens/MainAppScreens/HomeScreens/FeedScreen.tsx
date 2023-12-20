import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../../../common/buttons/button'
import i18n from '../../../language/i18'
import { logout } from '../../../redux/slices/authSlice'
import { useAppDispatch } from '../../../redux/store/store'

const FeedScreen = () => {

    const { t } = useTranslation()

    const dispatch = useAppDispatch()

    const onClose = () => {
        dispatch(logout())
    }

    const changeLanguage = () => {
        i18n.changeLanguage("en")

    }
    return (
        <View>
            <Text>FeedScreen</Text>
            <Button label='cerrar sesion' onPress={onClose} />
            <Button label={t("actions.change_language")} onPress={changeLanguage} />
        </View>
    )
}

export default FeedScreen

const styles = StyleSheet.create({})