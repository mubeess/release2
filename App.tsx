import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigationContainer from './src/navigation/AppNavigationContainer';
import { persistor, store } from './src/redux/store';

export default function App() {
  const [fontLoaded] = useFonts({
    saf: require('./assets/fonts/saf.ttf'),
  });
  if (!fontLoaded) return null;
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigationContainer />
        </PersistGate>
      </Provider>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({});