import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, MD3Theme, useTheme } from 'react-native-paper';
import LocationModal from '../../components/Modals/LocationModal';

// Componente para buscar y listar lugares
const LocationSearch = ({ onLocationSelect }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const { t } = useTranslation();

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const theme = useTheme();

    const styles = style(theme)




    const handleLocationSelected = (location) => {
        setSelectedLocation(location);
        closeModal();
        onLocationSelect(location); // Esta línea llama a la función pasada por el componente padre.
    };

    // Función para manejar la búsqueda en vivo
    // Debounce para esperar hasta que el usuario deje de escribir

    // Renderiza cada ítem de la lista de resultados
    const renderListItem = ({ item }) => (
        <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                <Button icon={"map-marker"} style={styles.buttonsStyle} mode="contained" onPress={openModal}>
                    {selectedLocation ? <Text>{t("label.location")}: {selectedLocation.name}</Text> : <Text>{t("label.add_location")}</Text>}
                </Button>

                {selectedLocation ? <Button mode="contained" style={styles.buttonsStyle} onPress={() => setSelectedLocation(null)}>
                    <Entypo name="cross" size={24} color="black" />
                </Button> :
                    <Button style={styles.buttonsStyle} mode="contained" onPress={openModal}>
                        <Entypo name="chevron-right" size={24} color={theme.colors.onSurface} />
                    </Button>
                }

                <LocationModal
                    isVisible={modalVisible}
                    onLocationSelected={handleLocationSelected}
                    onClose={closeModal}
                />
            </View>
        </View>
    );
};

// Estilos para los componentes
const style = (theme: MD3Theme) => StyleSheet.create({
    container: {
        // margin: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    listItemText: {
        fontSize: 16,
    },
    buttonsStyle: { backgroundColor: "transparent" }
});

export default LocationSearch;
