import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';

interface ListButtonProps {
    color?: string;
    leftIcon?: React.ReactNode;
    text: string;
    rightIcon?: React.ReactNode;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const ListButton: React.FC<ListButtonProps> = ({ color, leftIcon, text, rightIcon, onPress, style, textStyle }) => {
    const theme = useTheme();
    const styles = styleSheet(theme);

    return (
        <TouchableOpacity onPress={onPress} style={[styles.boton, { backgroundColor: color || theme.colors.inverseOnSurface }, style]}>
            {leftIcon && <View style={styles.icono}>{leftIcon}</View>}
            <Text style={[styles.texto, textStyle]}>{text}</Text>
            {rightIcon && <View style={styles.icono}>{rightIcon}</View>}
        </TouchableOpacity>
    );
};

const styleSheet = (theme: MD3Theme) => StyleSheet.create({
    boton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingLeft: 20,
        paddingRight: 5,
        borderRadius: 5,

    },
    icono: {
        justifyContent: 'flex-end',
        color: theme.colors.onSurface
    },
    texto: {
        fontSize: 16,
        color: theme.colors.onPrimary,
    },
});

export default ListButton;
