// import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
// import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
// import { BackHandler, StyleSheet, Text } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { MD3Theme, useTheme } from 'react-native-paper';

// export type Ref = BottomSheetModal;

// const CustomBottomSheetModal = forwardRef<Ref>((props, ref: any) => {
// 	const snapPoints = useMemo(() => ['50%', '75%'], []);
// 	const theme = useTheme();
// 	const styles = style(theme);

// 	const bottomSheetRef = useRef<BottomSheetModal>(null);

// 	const renderBackdrop = (backdropProps) => (
// 		<BottomSheetBackdrop
// 			{...backdropProps}
// 			disappearsOnIndex={-1}
// 			appearsOnIndex={0}
// 			onPress={() => ref?.current?.close()}
// 		/>
// 	);

// 	useEffect(() => {
// 		const backAction = () => {
// 			if (ref?.current) {
// 				ref.current.close();
// 				return true;
// 			}
// 			return false;
// 		};

// 		BackHandler.addEventListener('hardwareBackPress', backAction);

// 		return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
// 	}, [ref]);

// 	return (
// 		<BottomSheetModal
// 			backgroundStyle={{ backgroundColor: "orange" }}
// 			backdropComponent={renderBackdrop}
// 			containerStyle={{}}
// 			handleIndicatorStyle={{}}
// 			stackBehavior='replace'
// 			enablePanDownToClose={true}
// 			ref={ref}
// 			index={0}
// 			snapPoints={snapPoints}
// 		>
// 			<BottomSheetView style={styles.contentContainer}>
// 				<Text>First Modal 🎉</Text>
// 				<TouchableOpacity onPress={() => ref?.current?.close()}>
// 					<Text>DDDDDDDD</Text>
// 				</TouchableOpacity>
// 			</BottomSheetView>
// 		</BottomSheetModal>
// 	);
// });

// const style = (theme: MD3Theme) => StyleSheet.create({
// 	contentContainer: {
// 		shadowColor: "#000",
// 		shadowOffset: {
// 			width: 0,
// 			height: 10,
// 		},
// 		shadowOpacity: 0.53,
// 		shadowRadius: 13.97,
// 		elevation: 21,
// 		flex: 1,
// 		alignItems: 'center',
// 		backgroundColor: "yellow"
// 	},
// 	containerHeadline: {
// 		fontSize: 24,
// 		fontWeight: '600',
// 		padding: 20
// 	}
// });

// export default CustomBottomSheetModal;
