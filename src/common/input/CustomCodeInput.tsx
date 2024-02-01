import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { COLORS } from '../../styles/colors';

const CustomCodeInput = ({ codeArray }) => {

    const theme = useTheme();
    const styles = style(theme)

    // Asegurar que el array tenga exactamente 6 dígitos
    const paddedCodeArray = codeArray.slice(0, 6).concat(Array(6 - codeArray.length).fill(null));

    return (
        <View style={styles.root}>
            {paddedCodeArray.map((digit, index) => (
                <View key={index} style={[styles.cell, digit !== null && styles.filledCell]}>
                    <Text style={styles.cellText}>{digit}</Text>
                </View>
            ))}
        </View>
    );
};

const style = (theme: MD3Theme) => StyleSheet.create({

    root: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    cell: {
        width: 40,
        height: 55,
        marginHorizontal: 7,
        borderBottomWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filledCell: {
    },
    cellText: {
        fontSize: 24,
    },
});

export default CustomCodeInput;
