import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MD3Theme, useTheme } from 'react-native-paper';

type props = {
    text: string;
    color?: string;
    underline?: boolean;
    fontWeight?: any

    // Agregamos una prop para controlar el subrayado
}

const SmallText = ({ text, color, underline, fontWeight }: props) => {
    const theme = useTheme();
    const styles = style(theme, color, underline, fontWeight); // Pasa la prop 'underline' al estilo

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

export default SmallText;

const style = (theme: MD3Theme, color?: string, underline?: boolean, fontWeight?: any,
) => StyleSheet.create({
    container: {
        margin: "2%"
    },
    text: {
        fontWeight: fontWeight,
        fontSize: 14,
        color: color || theme.colors.onPrimary,
        textDecorationLine: underline ? 'underline' : 'none', // Agregamos el subrayado si 'underline' es true
    }
});
