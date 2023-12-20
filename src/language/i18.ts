// i18n.js (o el nombre que prefieras)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en.json';
import es from './translations/es.json';
// import fr from './translations/fr.json'
i18n
    .use(initReactI18next) // inicializa react-i18next
    .init({
        compatibilityJSON: 'v3',
        resources: {
            // Aquí deberías tener tus traducciones en diferentes idiomas
            // Ejemplo:
            en: {
                translation: en
            },
            es: {
                translation: es
            },
            // ...
        },
        lng: 'es', // Idioma por defecto
        fallbackLng: 'es', // Idioma de respaldo si no se encuentra la traducción
        interpolation: {
            escapeValue: false,
            // No escapar cadenas traducidas para permitir caracteres especiales
        },

    });

export default i18n;
