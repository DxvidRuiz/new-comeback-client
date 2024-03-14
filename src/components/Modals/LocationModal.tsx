import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const LocationModal = ({ isVisible, onLocationSelected, onClose }) => {
    const { t } = useTranslation();

    const [errorMessage, setErrorMessage] = useState('');

    const GOOGLE_API_KEY = "AIzaSyBrQ98JD4VitNGwYsp7-ZULJZer6VqANgo"


    useEffect(() => {
        if (!GOOGLE_API_KEY) {
            setErrorMessage('API Key de Google no configurada');
        }
    }, []);

    const handleSelectPlace = (data, details) => {
        if (details) {
            onLocationSelected(details);
            onClose();
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {/* <ErrorBoundary>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
          </ErrorBoundary> */}
                    <GooglePlacesAutocomplete
                        placeholder={t("label.search_place")}
                        onPress={handleSelectPlace}
                        query={{
                            key: GOOGLE_API_KEY,
                            language: 'es',
                            types: '(cities)',
                        }}
                        fetchDetails={true}


                        styles={{
                            textInputContainer: styles.searchInput,
                            listView: { width: '100%' },

                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        position: "relative",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalView: {
        position: "absolute",
        bottom: 0,
        height: "90%",
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    searchInput: {
        // height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 20,
        width: '100%',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default LocationModal;
