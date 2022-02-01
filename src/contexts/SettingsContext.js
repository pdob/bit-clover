import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsContext = createContext();

const SettingsContextProvider = (props) => {

  const [currency, setCurrency] = useState('USD');
  const [pushNotificationsActive, setPushNotificationsActive] = useState(false);
  const [defaultScreen, setDefaultScreen] = useState('Home');
  let currencySymbol = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$';
  
  
  const setCurrencyValue = async (value) => {
    try {
      await AsyncStorage.setItem('currency', value)
    }
    catch(e) {
      console.warn(e);
    }
  }
  

  const getCurrency = async () => {
    await AsyncStorage.getItem('currency').then((value) => {
      if(value) {
        setCurrency(value);
      }
    })
  }
  
  const setDefaultScreenValue = async (value) => {
    try {
      await AsyncStorage.setItem('defaultScreen', value)
    }
    catch(e) {
      console.warn(e);
    }
  }

  const getDefaultScreen =  async (value) => {
    try {
      await AsyncStorage.getItem('defaultScreen')
      .then((value) => {
        if(value) {
          setDefaultScreen(value);
        }
      })
    }
    catch(e) {
      console.warn(e);
    }
  }

 
  const setPushNotificationsActiveValue = async (value) => {
    try {
      await AsyncStorage.setItem('pushNotificationsActive', JSON.stringify(value))
    }
    catch(e) {
      console.warn(e);
    }
  }

  const getPushNotificationsActive =  async () => {
    try {
      await AsyncStorage.getItem('pushNotificationsActive')
      .then((value) => {
        setPushNotificationsActive(JSON.parse(value));
        return;
      })
    }
    catch(e) {
      console.warn(e);
    }
  }

  useEffect(() => {   
    getCurrency();
    getPushNotificationsActive();
    getDefaultScreen();
  }, [currency])
  
  return (
    <SettingsContext.Provider
      value={{
        currency,     
        setCurrencyValue,
        setCurrency,
        pushNotificationsActive,
        setPushNotificationsActive,
        setPushNotificationsActiveValue,
        defaultScreen,
        setDefaultScreen,
        setDefaultScreenValue,
        currencySymbol,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsContextProvider;