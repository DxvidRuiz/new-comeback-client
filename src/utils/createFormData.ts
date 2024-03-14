export const createFormData = (mediaItems, additionalData = {}) => {
    const formData = new FormData();

    // Agregar datos adicionales al FormData
    for (const key in additionalData) {
        formData.append(key, additionalData[key]);
    }

    // Procesar todos los elementos de mediaItems, ya sean imágenes o videos
    mediaItems.forEach((item) => {
        // Extraer la información del archivo
        const { uri, mediaType } = item;
        const fileName = uri.split('/').pop();
        const fileType = fileName.split('.').pop();

        // Asumiendo que la URI es directamente utilizable (sin convertir a Blob)
        // Determinar la clave correcta (image o video) basada en el mediaType
        const formKey = mediaType === 'photo' ? 'image' : 'video';

        // Preparar el objeto a adjuntar
        const fileObject = {
            uri: uri,
            name: fileName, // Asegúrate de que el nombre del archivo sea único y adecuado
            type: mediaType === 'photo' ? `image/${fileType}` : `video/${fileType}`
        };

        // Añadir el archivo al FormData. 
        // Nota: Algunas implementaciones/backend pueden requerir que el objeto se pase directamente sin 'as any'.
        formData.append(formKey, fileObject as any);
    });

    return formData;
};
