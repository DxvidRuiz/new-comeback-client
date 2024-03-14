import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Importa GestureHandlerRootView
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import i18n from './src/language/i18';
import Routes from './src/navigation/routes';
import { persistor, store } from './src/redux/store/store';

export default function App() {
  const isDarkMode = false; // Cambia este valor para simular el cambio de tema

  const backgroundColor = isDarkMode ? '#000000' : 'blue';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.container, { backgroundColor: backgroundColor }]}>
        <Provider store={store}>
          <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
            <I18nextProvider i18n={i18n}>
              <Routes />
              <FlashMessage position={"top"} />
            </I18nextProvider>
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
