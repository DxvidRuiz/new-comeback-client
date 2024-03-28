import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';

const { width } = Dimensions.get('window');

const ImageCarouselComponent = ({ imageUrls }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <View style={styles.container}>
            <PagerView
                style={styles.pagerView}
                initialPage={0}
                onPageSelected={e => setActiveIndex(e.nativeEvent.position)}
            >
                {imageUrls.map((item, index) => (
                    <View key={index} style={{ width }}>
                        <Image
                            source={{ uri: item.url }}
                            style={styles.image}
                        />
                    </View>
                ))}
            </PagerView>
            {imageUrls.length > 1 && ( // Solo muestra los indicadores si hay más de una imagen
                <View style={styles.indicatorContainer}>
                    {imageUrls.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                activeIndex === index ? styles.indicatorActive : styles.indicatorInactive,
                            ]}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative', // Necesario para posicionar los indicadores sobre la imagen
    },
    pagerView: {
        flex: 1,
        height: "100%", // Asegura que el carrusel ocupe todo el contenedor
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Asegura que las imágenes cubran el espacio disponible
    },
    indicatorContainer: {
        position: 'absolute', // Posiciona el contenedor de indicadores sobre las imágenes
        bottom: 10, // Distancia desde la parte inferior del carrusel
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Asegura que el contenedor se extienda a lo ancho del carrusel
    },
    indicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 3.5,
    },
    indicatorActive: {
        backgroundColor: '#FFFFFF', // Color de los indicadores activos
    },
    indicatorInactive: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Color de los indicadores inactivos con transparencia
    },
});

export default ImageCarouselComponent;
