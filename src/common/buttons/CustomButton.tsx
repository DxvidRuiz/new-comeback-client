import React from 'react'
import { Button as ButtonPaper, useTheme } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

// Añadir los tipos de tamaño que deseas soportar
type ButtonSize = 'small' | 'medium' | 'large'

type Props = {
    onPress: (e: any) => void
    disabled?: boolean
    loading?: boolean
    textColor?: string
    label: string
    Icon?: IconSource
    color?: 'secondary' | 'primary' | 'success' | 'danger' | "tertiary" | "clear"// Añadir más variantes de color si es necesario
    type?: 'contained' | 'contained-tonal' | 'elevated' | 'outlined' | "text"
    size?: ButtonSize // Añadir la propiedad de tamaño
}

const CustomButton = ({ onPress, label, Icon, color, size, disabled, loading, type, textColor }: Props) => {
    const theme = useTheme()

    // Función para obtener el color del botón basado en la prop 'color'
    const getButtonColor = () => {
        switch (color) {
            case 'primary':
                return theme.colors.primary
            case 'clear':
                return theme.colors.surface
            case 'tertiary':
                return theme.colors.onTertiary
            case 'success':
                return theme.colors.onTertiary // Asegúrate de tener esta color definido en tu tema
            case 'danger':
                return theme.colors.error // Asegúrate de tener esta color definido en tu tema
            case 'secondary':
            default:
                return theme.colors.secondary
        }
    }

    // Obtener los estilos aplicables basados en las props
    const buttonColor = getButtonColor()

    return (
        <ButtonPaper
            disabled={disabled}
            textColor={textColor ? textColor : theme.colors.onSecondary}
            buttonColor={buttonColor}
            mode={type}
            onPress={onPress}
            icon={Icon}

            loading={loading}
        >
            {label}
        </ButtonPaper>
    )
}

export default CustomButton