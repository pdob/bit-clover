import React, { useState, createContext } from 'react';


export const SettingsContext = createContext();

const SettingsContextProvider = (props) => {

  const [currency, setCurrency] = useState('usd');
  const [pushNotificationsActive, setPushNotificationsActive] = useState(false);
  const [pushNotifcationsInterval, setPushNotificationsInterval] = useState('Daily');
  const [defaultScreen, setDefaultScreen] = useState('Home');

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
        setDefaultScreen       
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsContextProvider;