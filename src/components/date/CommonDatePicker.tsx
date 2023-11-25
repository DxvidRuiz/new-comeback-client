import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { MD3Theme, useTheme } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
type datetype = {
    day: string | number
    month: string | number
    year: string | number
    openCalendar: () => void

}

const CommonDatePicker = ({ day, month, year, openCalendar }: datetype) => {

    const theme = useTheme();
    const styles = style(theme)

    return (
        <View style={styles.container}>
            <View style={styles.itenContainer}>
                <Text style={styles.text} >{month}</Text>
            </View>
            <View style={styles.itenContainer}>
                <Text style={styles.text} >{day}</Text>
            </View>
            <View style={styles.itenContainer}>
                <Text style={styles.text} >{year}</Text>
            </View>
            <TouchableOpacity style={styles.iconContainer} onPress={openCalendar}>
                <FontAwesome5 name="calendar" size={24} color={theme.colors.onTertiary} />
            </TouchableOpacity>
        </View>
    )
}

export default CommonDatePicker

const style = (theme: MD3Theme) => StyleSheet.create({

    container: {
        width: "100%",
        height: 55,
        flexDirection: "row",
        gap: 6


    },
    itenContainer: {
        backgroundColor: theme.colors.surface,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: theme.colors.onTertiary,
        borderBottomWidth: 1
    },
    iconContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1
    },
    text: { color: "white" }
})