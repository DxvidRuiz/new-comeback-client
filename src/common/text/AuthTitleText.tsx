import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type prpos = {
    text: string,
    color?: string,
    onPress?: () => void,

}


const AuthTitleText = ({ text, color, onPress }: prpos) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        contaniner: {
            margin: "2%"
        },
        text: {
            fontWeight: "800",
            fontSize: 30,
            color: color || theme.colors.onPrimary // Usa un color por defecto del tema si 'color' no se provee
        }

    })
    return (
        <View style={styles.contaniner} >
            <Text onPress={onPress} style={styles.text}>{text}</Text>
        </View>
    )
}

export default AuthTitleText
