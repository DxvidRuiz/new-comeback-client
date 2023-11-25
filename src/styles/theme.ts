import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#02FEFF', // Cian como color principal
    onPrimary: '#000000', // Texto negro sobre cian
    primaryContainer: '#B3EFFF', // Un cian más claro para contenedores/áreas con el color principal
    onPrimaryContainer: '#002329', // Texto oscuro para contrastar con cian claro
    secondary: '#000000', // Negro para elementos secundarios
    onSecondary: '#FFFFFF', // Texto blanco sobre negro
    secondaryContainer: '#1c1c1c', // Un negro más suave para contenedores secundarios
    onSecondaryContainer: '#E0E0E0', // Gris claro para texto sobre fondos secundarios más suaves
    tertiary: '#FF0000', // Rojo para errores y alertas
    onTertiary: '#FFFFFF', // Blanco sobre rojo para contraste
    error: '#FF0000', // El mismo rojo para errores
    onError: '#FFFFFF', // Blanco sobre rojo para errores
    background: '#FFFFFF', // Fondo blanco
    onBackground: '#000000', // Texto negro sobre fondo blanco
    surface: '#FFFFFF', // Superficies blancas
    onSurface: '#000000', // Texto negro sobre superficies blancas
    // Continúa con los demás colores según sea necesario...
  },
};


export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#000000', // Negro como color principal
    onPrimary: '#FFFFFF', // Texto blanco sobre negro para alto contraste
    primaryContainer: '#1c1c1c', // Un tono de negro más suave para contenedores
    onPrimaryContainer: '#FFFFFF', // Texto blanco sobre el tono de negro más suave
    secondary: '#02FEFF', // Cian como color secundario
    onSecondary: '#000000', // Texto negro sobre cian para alto contraste
    secondaryContainer: '#004D4D', // Un cian oscuro para contenedores secundarios
    onSecondaryContainer: '#02FEFF', // Cian claro sobre el cian oscuro para contraste
    tertiary: '#FF0000', // Rojo para errores y alertas
    onTertiary: '#FFFFFF', // Blanco sobre rojo para contraste
    error: '#FF6B6B', // Rojo claro para errores en tema oscuro
    onError: '#000000', // Texto negro sobre rojo claro
    background: '#121212', // Fondo muy oscuro (casi negro)
    onBackground: '#FFFFFF', // Texto blanco sobre fondo oscuro
    surface: '#121212', // Igual que el fondo
    onSurface: '#FFFFFF', // Texto blanco sobre superficie oscura
    // Asegúrate de ajustar el resto de los colores según tus necesidades.
  },
};
