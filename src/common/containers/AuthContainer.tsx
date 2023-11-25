import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper';

const AuthContainer = ({ children }) => {
    const theme = useTheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: "10%",
            backgroundColor: theme.colors.primary
        },
    })
    return <View style={styles.container}>{children}</View>;


}

export default AuthContainer
