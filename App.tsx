import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import Routes from './src/navigation/routes';

import { store } from './src/redux/store/store';
import { Provider } from 'react-redux'


export default function App() {
  return (


    <SafeAreaView style={[styles.container, { marginTop: Platform.OS === "android" ? 30 : 0 }]}>
      <Provider store={store}>
        <Routes />
        <StatusBar style="auto" />
      </Provider>
    </SafeAreaView>


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
