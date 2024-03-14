import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet } from 'react-native';

const numColumns = 3; // Número de columnas en el mosaico
const size = Dimensions.get('window').width / numColumns; // Ancho de cada ítem del mosaico

const ImageGrid = ({ images }) => {
    return (
        <FlatList
            data={images}
            renderItem={({ item }) => (
                <Image
                    source={{ uri: item.uri }}
                    style={{ width: size, height: size }}
                />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
        />
    );
};

const styles = StyleSheet.create({
    // Tus estilos aquí
});

export default ImageGrid;
