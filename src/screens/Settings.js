import React, { createContext, useState, useEffect, useContext } from 'react';
import { Pressable, Text, View, Switch, ScrollView, Modal, Dimensions } from 'react-native';
import * as Linking from 'expo-linking';
import styles from '../config/styles';
import AppHeader from '../components/AppHeader';
import { SettingsContext } from '../contexts/SettingsContext';
import { useNavigation } from '@react-navigation/core';

const SIZE = Dimensions.get('window');

const Settings = () => {

  const { 
    currency, 
    setCurrency, 
    defaultScreen, 
    setDefaultScreen, 
    pushNotificationsActive, 
    setPushNotificationsActive, 
    pushNotifcationsInterval, 
    setPushNotificationsInterval
  } = useContext(SettingsContext); 

  const navigation = useNavigation();

  const [toggleCurrency, setToggleCurrency] = useState(false);
  const [toggleDefaultScreen, setToggleDefaultScreen] = useState(false);
  const [togglePushInterval, setTogglePushInterval] = useState(false);

  const togglePushNotifications = () => setPushNotificationsActive(!pushNotificationsActive);

  const SettingsButton = ({ title, value, onPress }) => {
    return (
      <Pressable onPress={onPress}>
        <View style={styles.settingsButton}>
          <Text style={styles.settingsSubheading}>{title}</Text>
          <Text style={styles.settingsValue}>{value}</Text>
        </View>
      </Pressable>
    );
  }


  const MenuOptions = ({ value, title, setValue, visible, setVisible, options }) => {
    return (

      <Modal 
        animationType='none'
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.settingsModal}>
          <View style={{backgroundColor: 'black', width: '100%'}}>
            <Text style={styles.settingsHeading}>{title}</Text>
          </View>
          {options.map((item, index) => {
            return (
              <Pressable key={index} onPress={() => {
                setValue(item)
                setVisible(false)  
              }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: item === value ? 'grey' : '#263238',
                    borderRadius: 5,
                    justifyContent: 'space-between',
                    height: 53,
                    width: '100%'
                }}>
                  <Text style={styles.settingsSubheading}>{item}</Text>
                </View>
                <View style={styles.separator}/>
              </Pressable>
            )
          })}
          <Pressable onPress={() => setVisible(false)} style={{bottom: 40, position: 'absolute'}}>
            <View style={styles.settingsModalCloseButton}>
              <Text style={{color: 'white', fontSize: 20, fontFamily: 'serif', textAlign: 'center'}}>Close</Text>
            </View>
          </Pressable>
        </View>
      </Modal>
    );
  }
  
  

  return (
    <ScrollView style={styles.container}>
      <AppHeader />

      <View style={styles.settingsContainer}>

        <Text style={styles.settingsHeading}>General</Text>
        <SettingsButton 
          title={'Currency'}
          value={currency.toUpperCase()}
          onPress={() => setToggleCurrency(!toggleCurrency)}
        />
        <MenuOptions 
          title={'Currency'}
          value={currency}
          setValue={setCurrency}
          visible={toggleCurrency}
          setVisible={setToggleCurrency}
          options={['USD', 'GBP', 'EUR']}
        />
        <View style={styles.separator}/>
        <SettingsButton 
          title={'Default Screen'}
          value={defaultScreen}
          onPress={() => setToggleDefaultScreen(!toggleDefaultScreen)}
        />

        <MenuOptions 
          title={'Default Screen'}
          value={defaultScreen}
          setValue={setDefaultScreen}
          visible={toggleDefaultScreen}
          setVisible={setToggleDefaultScreen}
          options={['Home', 'Markets', 'Exchanges', 'News', 'Settings']}
        />  

        <Text style={styles.settingsHeading}>Notifications</Text>
        <View style={styles.settingsButton}>
          <Text style={styles.settingsSubheading}>Enable Push Notifications</Text>
          <Switch 
            trackColor={{ false: '#b6bab8', true: '#3eb6de'}}
            thumbColor={{ false: 'white', true: 'white'}}
            onValueChange={togglePushNotifications}
            value={pushNotificationsActive}
          />
        </View>
        <View style={styles.separator} />
        <SettingsButton 
          title={'Push Notification frequency'}
          value={pushNotifcationsInterval}
          onPress={() => setTogglePushInterval(!togglePushInterval)}
        />

        <MenuOptions 
          title={'Push notification frequency'}
          value={pushNotifcationsInterval}
          setValue={setPushNotificationsInterval}
          visible={togglePushInterval}
          setVisible={setTogglePushInterval}
          options={['Daily', 'Weekly', 'Monthly']}
        />  

        <Text style={styles.settingsHeading}>About</Text>
        <SettingsButton title={'Contact Us'} onPress={() => Linking.openURL('mailto: bitcloveruk@gmail.com')}/>
        <SettingsButton title={'Privacy Policy'} onPress={() => navigation.navigate('Privacy')} />
        <SettingsButton title={'Terms of Use'} onPress={() => navigation.navigate('Terms')}/>
        <SettingsButton title={'Rate BitClover'}/>
        <Text style={{fontSize: 15, color: 'white', paddingTop: 10}}>BitClover for Android v1.0.0</Text>
      </View>

    </ScrollView>
  );
};

export default Settings;