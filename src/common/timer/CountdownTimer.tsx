import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import MediumText from '../text/MediumText';

const CountdownTimer = ({ onTimerEnd, start }) => {
    const initialTime = 10; // 10 segundos por defecto
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    const theme = useTheme();
    const styles = style(theme);

    useEffect(() => {
        let timerId;

        if (start) {
            // Iniciar o reiniciar la cuenta regresiva
            setTimeRemaining(initialTime);

            timerId = setInterval(() => {
                setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
        } else {
            // Detener la cuenta regresiva
            clearInterval(timerId);
        }

        // Cleanup al desmontar el componente o al cambiar la propiedad 'start'
        return () => clearInterval(timerId);
    }, [start, initialTime]);

    useEffect(() => {
        if (timeRemaining === 0 && start) {
            // La cuenta regresiva ha llegado a cero y 'start' es true,
            // ejecutar la función proporcionada
            onTimerEnd();
        }
    }, [timeRemaining, onTimerEnd, start]);

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <View style={styles.container}>
            <MediumText color={theme.colors.onPrimary} fontWeight={"bold"} text={`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} s`} />
        </View>
    );
};

const style = (theme: MD3Theme) =>
    StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        timerText: {
            fontSize: 24,
            fontWeight: 'bold',
        },
    });

export default CountdownTimer;
