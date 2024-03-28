import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Modal, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { COLORS } from '../../styles/colors';
type ModalReutilizableProps = {
	titulo?: string; // El signo de interrogación indica que la prop 'titulo' es opcional
	contenido: React.ReactNode;
	onClose: () => void;
	visible: boolean;
};


const ModalReutilizable: React.FC<ModalReutilizableProps> = ({ titulo, contenido, onClose, visible }) => {
	const alturaVentana = Dimensions.get('window').height;
	const animacionDeslizar = useRef(new Animated.Value(alturaVentana))?.current;

	const opacidadFondo = animacionDeslizar.interpolate({
		inputRange: [0, alturaVentana],
		outputRange: [1, 0.5], // Ajusta estos valores según lo que necesites
		extrapolate: 'clamp',
	});

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gestureState) => {
				if (gestureState.dy > 0) {
					animacionDeslizar.setValue(gestureState.dy);
				}
			},
			onPanResponderRelease: (event, gestureState) => {
				if (gestureState.dy > 100) {
					ocultarModal();
				} else {
					Animated.timing(animacionDeslizar, {
						toValue: 0,
						duration: 300,
						useNativeDriver: true,
					}).start();
				}
			},
		})
	)?.current;

	useEffect(() => {
		if (visible) {
			mostrarModal();
		} else {
			ocultarModal();
		}
	}, [visible]);

	const mostrarModal = () => {
		Animated.timing(animacionDeslizar, {
			toValue: 0,
			duration: 300,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: true,
		}).start();
	};

	const ocultarModal = () => {
		Animated.timing(animacionDeslizar, {
			toValue: alturaVentana,
			duration: 300,
			easing: Easing.in(Easing.cubic),
			useNativeDriver: true,
		}).start(() => {
			if (onClose) onClose();
		});
	};



	const theme = useTheme();
	const styles = style(theme);


	return (
		<Modal transparent={true} visible={visible} onRequestClose={ocultarModal}>
			<TouchableOpacity
				style={StyleSheet.absoluteFill}
				activeOpacity={1}
				onPressOut={ocultarModal} // Usa onPressOut para manejar el toque fuera del área del modal
			>
				<Animated.View style={[styles.fondoModal, { opacity: opacidadFondo }]}>
					<Animated.View
						style={[
							styles.modalView,
							{ transform: [{ translateY: animacionDeslizar }] },
						]}
						{...panResponder.panHandlers}
					>


						<View style={styles.gridIcon}><FontAwesome5 name="minus" size={24} color={COLORS.gray05} /></View>
						{titulo && <Text style={styles.titulo}>{titulo}</Text>}
						{contenido}
						{/* <TouchableOpacity style={styles.botonCerrar} onPress={ocultarModal}>
							<Text style={styles.textoBotonCerrar}>Cerrar</Text>
						</TouchableOpacity> */}
					</Animated.View>
				</Animated.View>
			</TouchableOpacity>
		</Modal>
	);
};

const style = (theme: MD3Theme) => StyleSheet.create({
	fondoModal: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	gridIcon: {},
	modalView: {
		backgroundColor: theme.colors.background,
		paddingTop: 2,
		paddingBottom: 20,
		paddingHorizontal: 20,
		alignItems: 'center',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		minHeight: 200, // Asegura que el modal tiene suficiente espacio para deslizar
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	titulo: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 15,
	},
	botonCerrar: {
		marginTop: 20,
	},
	textoBotonCerrar: {
		fontSize: 18,
		color: '#007AFF',
		textAlign: 'center',
	},
});

export default ModalReutilizable;

