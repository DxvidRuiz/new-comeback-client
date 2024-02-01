import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

type prpos = {
    text: string,
    color?: string,
    onPress?: () => void,

}


const SubtitleText = ({ text, color, onPress }: prpos) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        contaniner: {
            margin: "2%"
        },
        text: {
            fontWeight: "800",
            fontSize: 25,
            color: color || theme.colors.onPrimary // Usa un color por defecto del tema si 'color' no se provee
        }

    })
    return (
        <View style={styles.contaniner} >
            <Text onPress={onPress} style={styles.text}>{text}</Text>
        </View>
    )
}

export default SubtitleText
