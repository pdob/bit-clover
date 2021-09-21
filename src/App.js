import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigation';
import SettingsContextProvider from './contexts/SettingsContext';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <SettingsContextProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </SettingsContextProvider>
    </SafeAreaView>
  );
}
