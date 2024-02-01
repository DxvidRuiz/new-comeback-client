import CryptoJS from "react-native-crypto-js";


// Función para encriptar un string
export const encryptString = async (text: string, key: string) => {
    const ciphertext = CryptoJS.AES.encrypt(text, key).toString();
    return ciphertext;
};



// Función para desencriptar un string
export const decryptString = async (ciphertext, key) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};


// Función para encriptar un objeto
export const encryptObject = async (object, key) => {
    const jsonString = JSON.stringify(object);
    const ciphertext = CryptoJS.AES.encrypt(jsonString, key).toString();
    return ciphertext;
};


// Función para desencriptar un objeto
export const decryptObject = async (ciphertext, key) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
};
