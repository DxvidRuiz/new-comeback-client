import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './src/navigation/routes';
import { persistor, store } from './src/redux/store/store';

import { useTranslation } from 'react-i18next';
import FlashMessage from 'react-native-flash-message';
import i18n from './src/language/i18';
export default function App() {

  const { t } = useTranslation()

  return (

    // <DbContextProvider>
    <SafeAreaView style={[styles.container, { marginTop: Platform.OS === "android" ? 30 : 0 }]}>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <I18nextProvider i18n={i18n}>

            <Routes />
            <FlashMessage position={"top"} />
            <StatusBar style="auto" />
          </I18nextProvider>

        </PersistGate>
      </Provider>
    </SafeAreaView>
    // </DbContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
