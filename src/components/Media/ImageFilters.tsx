import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FilterPreviewItem = ({ filterName, originalImageUri, filterEffect, onPress, style }) => (
    <TouchableOpacity style={styles.filterItem} onPress={onPress}>
        <Image source={{ uri: originalImageUri }} style={styles.filterIcon} />
        {/* Asumiendo que filterEffect puede ser aplicado aquí, podría ser necesario un componente personalizado o una implementación específica */}
        <Text style={styles.filterText}>{filterName}</Text>
    </TouchableOpacity>
);

const FilterPreviewListHorizontal = ({ filters, originalImageUri, onFilterSelect }) => {
    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleFilterPress = (filterEffect) => {
        setSelectedFilter(filterEffect);
        onFilterSelect(filterEffect);
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {filters.map((item) => (
                    <FilterPreviewItem
                        key={item.name}
                        filterName={item.name}
                        originalImageUri={originalImageUri}
                        filterEffect={item.effect}
                        onPress={() => handleFilterPress(item.effect)}
                        style={selectedFilter === item.effect ? styles.filterItemActive : styles.filterItem}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Tus estilos de contenedor aquí
    },
    filterItem: {
        padding: 10,
        alignItems: 'center',
        marginRight: 10,
    },
    filterItemActive: {
        backgroundColor: '#eee', // Estilo opcional para el filtro seleccionado
    },
    filterIcon: {
        width: 80, // Ajusta según necesidad
        height: 80, // Ajusta según necesidad
        marginBottom: 5,
    },
    filterText: {
        fontSize: 12,
    },
});

export default FilterPreviewListHorizontal;
