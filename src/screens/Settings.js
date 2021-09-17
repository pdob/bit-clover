import React, { createContext, useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import styles from '../config/styles';
import AppHeader from '../components/AppHeader';
import { ContextProvider } from 'react-is';


const SettingsContext = createContext({});

const Settings = () => {
  
  const [currency, setCurrency] = useState('usd');
  const [pushNotificationsActive, setPushNotificationsActive] = useState(false);
  const [pushNotifcationsInterval, setPushNotifcationsInterval] = useState(24);
  const [defaultScreen, setDefaultScreen] = useState('Home');


  const Ble = () => {
    return (
      <SettingsContext.Provider
        values={{
          currency,
          setCurrency
        }}
      >
      </SettingsContext.Provider>
    )
  }
   
  return (
    <View style={styles.container}>
      <AppHeader />
      <Text>
        Yoyoyo jebac popo
      </Text>
    </View>
  );
};

export { SettingsContext };

export default Settings;