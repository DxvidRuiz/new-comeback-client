import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper';

const MainContainer = ({ children }) => {
    const theme = useTheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 2,
            backgroundColor: theme.colors.background
        },
    })
    return <View style={styles.container}>{children}</View>;


}

export default MainContainer
