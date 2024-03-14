import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { COLORS } from '../../styles/colors';

// Definir el tipo para las props del componente
interface TextAreaInputProps {
    placeholder?: string;
    onTextChange?: (text: string) => void;
    value?: string;
    textColor?: string
    textAreaColor?: string
    placeholderTextColor?: string
}

// Componente de TextInput reutilizable que permite saltos de línea
const TextAreaInput: React.FC<TextAreaInputProps> = ({
    placeholder,
    onTextChange,
    value,
    textColor = "black",
    textAreaColor = "white",
    placeholderTextColor
}) => {

    const theme = useTheme();
    const styles = style(theme);
    return (
        <TextInput
            style={[styles.input, { color: textColor, backgroundColor: textAreaColor }]}
            onChangeText={onTextChange}
            cursorColor={COLORS.gray05}
            placeholderTextColor={placeholderTextColor}
            placeholder={placeholder}
            multiline // Permite múltiples líneas
            value={value} // Controla el valor del texto desde el padre, si se proporciona
        />
    );
};

// Estilos para el TextInput
const style = (theme: MD3Theme) => StyleSheet.create({
    input: {
        fontSize: 18,
        fontWeight: '400', // Esto hará que el texto sea en negrita

        minHeight: 40, // Altura mínima, permite que el TextInput crezca con el contenido
        maxHeight: 120, // Altura máxima, si quieres limitar el crecimiento
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
        borderColor: COLORS.gray05,
        backgroundColor: '#fff',
        textAlignVertical: 'top', // Asegura que el texto comience desde la parte superior en Android
    },
});

export default TextAreaInput;
