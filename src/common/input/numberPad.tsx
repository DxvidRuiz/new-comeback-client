import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';

interface NumberPadProps {
    digitList: (list: number[]) => void;
    clear: () => boolean; // Prop para limpiar la secuencia

}

const NumberPad: React.FC<NumberPadProps> = ({ digitList, clear }) => {
    const [numberSequence, setNumberSequence] = useState([]);
    const theme = useTheme();
    const styles = style(theme);

    useEffect(() => {
        // Llamar a digitList cuando la secuencia de números cambie
        digitList(numberSequence);
    }, [numberSequence, digitList]);

    const handleKeyPress = (key: number) => {
        if (numberSequence.length < 6) {
            setNumberSequence((prevSequence) => [...prevSequence, key]);
        }
    };

    const handleDelete = () => {
        if (numberSequence.length > 0) {
            setNumberSequence((prevSequence) => prevSequence.slice(0, -1));
        }
    };

    useEffect(() => {
        if (clear()) {
            setNumberSequence([]);
        }
    }, [clear]);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {[1, 2, 3].map((key) => (
                    <TouchableOpacity
                        key={key}
                        style={styles.key}
                        onPress={() => handleKeyPress(key)}
                    >
                        <Text style={styles.keyText}>{key}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.row}>
                {[4, 5, 6].map((key) => (
                    <TouchableOpacity
                        key={key}
                        style={styles.key}
                        onPress={() => handleKeyPress(key)}
                    >
                        <Text style={styles.keyText}>{key}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.row}>
                {[7, 8, 9].map((key) => (
                    <TouchableOpacity
                        key={key}
                        style={styles.key}
                        onPress={() => handleKeyPress(key)}
                    >
                        <Text style={styles.keyText}>{key}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.row}>
                <View style={styles.iconKey}></View>
                <TouchableOpacity style={styles.key} onPress={() => handleKeyPress(0)}>
                    <Text style={styles.keyText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconKey} onPress={handleDelete}>
                    <Ionicons name="backspace" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const style = (theme: MD3Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.onSecondary,
        borderRadius: 10,
        padding: 10,
        margin: 10,

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,


    },
    key: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: theme.colors.onSecondary,
        justifyContent: 'center',
        alignItems: 'center',



    },
    iconKey: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: theme.colors.onSecondary,
        justifyContent: 'center',
        alignItems: 'center',

    },
    confirmiconKey: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',

    },
    keyText: {
        fontSize: 25,
        color: theme.colors.secondary,
    },
});

export default NumberPad;
