import React, { useState, createContext } from 'react';
import { Dimensions } from 'react-native';


export const SettingsContext = createContext();

const SettingsContextProvider = (props) => {

  const SIZE = Dimensions.get('window');
  const [currency, setCurrency] = useState('USD');
  const [pushNotificationsActive, setPushNotificationsActive] = useState(false);
  const [pushNotifcationsInterval, setPushNotificationsInterval] = useState('Daily');
  const [defaultScreen, setDefaultScreen] = useState('Home');
  let currencySymbol = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$';

  return (
    <SettingsContext.Provider
      value={{
        currency,
        setCurrency,
        pushNotificationsActive,
        setPushNotificationsActive,
        pushNotifcationsInterval,
        setPushNotificationsInterval,
        defaultScreen,
        setDefaultScreen,
        currencySymbol,
        SIZE       
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsContextProvider;