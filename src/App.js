import React, { 
  useCallback, 
  useEffect, 
  useState 
} from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigation';
import SettingsContextProvider from './contexts/SettingsContext';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1}} onLayout={onLayoutRootView}>
      <StatusBar />
      <SettingsContextProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </SettingsContextProvider>
    </SafeAreaView>
  );
}
