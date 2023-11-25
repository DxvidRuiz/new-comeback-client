import React, { createElement } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput, useTheme, Text } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

type Props = {
    label: string
    formik?: any
    handleChange?: (name: string, text: string) => void
    externalOnChangeText?: (text: string) => void;
    value?: string
    name?: string
    error?: string
    IconLeft?: IconSource
    IconRight?: IconSource
    secureTextEntry?: boolean
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url'
}

const Input = ({ formik, value, handleChange, name, error, label, IconLeft, IconRight, secureTextEntry, keyboardType, externalOnChangeText }: Props) => {

    const theme = useTheme();
    const styles = style(theme)
    const iconColor = theme.colors.onSurface; // Establece el color del ícono basado en el color de la superficie del tema

    const handleTextChange = (text: string) => {
        // Llama a la función externalOnChangeText si está disponible
        if (externalOnChangeText) {
            externalOnChangeText(text);
        }
    };

    return (
        <>
            {
                formik ? <>
                    <TextInput
                        keyboardType={keyboardType}
                        label={label}
                        value={formik.values[name]}
                        onChangeText={(text) => {
                            formik.handleChange(name)(text);
                            handleTextChange(text);
                        }} style={styles.input}
                        error={Boolean(formik.errors[name])}
                        left={IconLeft ? <TextInput.Icon icon={IconLeft} color={iconColor} /> : undefined} // Agrega el icono personalizado
                        right={IconRight ? <TextInput.Icon icon={IconRight} color={iconColor} /> : undefined} // Agrega el icono personalizado
                        secureTextEntry={secureTextEntry}
                        onBlur={formik.handleBlur(name)} // Agrega la prop onBlur y utiliza formik.handleBlur para manejar el evento
                    />
                    {
                        formik.errors[name] && (<Text variant='labelSmall' style={{ color: theme.colors.error }}>
                            {formik.errors[name]}
                        </Text>)
                    }
                </> : <>
                    <TextInput
                        label={label}
                        value={value ?? ''}
                        onChangeText={(text: string) => handleChange(name, text)}
                        style={styles.input}
                        error={Boolean(error?.length)}
                        
                    />{
                        error && (<Text>
                            {error}
                        </Text>)
                    }
                </>
            }
        </>
    )
}

const style = (theme) => StyleSheet.create({
    input: {
        backgroundColor: theme.colors.surface
    },
})

export default Input
