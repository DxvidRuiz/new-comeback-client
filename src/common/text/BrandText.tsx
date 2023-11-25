import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MD3Theme, useTheme } from 'react-native-paper';

const BrandText = () => {
    const theme = useTheme();

    const styles = style(theme)

    return (
        <View style={styles.container} >
            <Text style={styles.text}>iimma</Text>
            <Text style={styles.text2}>be</Text>
        </View>
    )
}

export default BrandText



const style = (theme: MD3Theme) => StyleSheet.create({
    container: {
        margin: "2%",
        gap: 1,
        flexDirection: "row",
        justifyContent:"center"
    },
    text: {
        fontWeight: "800",
        fontSize: 30,
        color: theme.colors.secondary // Usa un color por defecto del tema si 'color' no se provee
    },
    text2: {
        fontWeight: "800",
        fontSize: 30,
        color: theme.colors.tertiary // Usa un color por defecto del tema si 'color' no se provee
    }

})

