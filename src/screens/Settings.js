import React, { 
  useContext, 
  useState 
} from 'react';
import { 
  Modal, 
  Pressable, 
  ScrollView, 
  Switch, 
  Text, 
  View, 
} from 'react-native';
import * as Linking from 'expo-linking';
import styles from '../config/styles';
import AppHeader from '../components/AppHeader';
import { SettingsContext } from '../contexts/SettingsContext';
import { useNavigation } from '@react-navigation/core';



const Settings = () => {

  {/** Import and destructure values and setters from the Settings Context */}

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

  {/** Reusable button component for different settings */}


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


  {/** Component which maps buttons for selecting options */}


  const MenuOptions = ({ value, title, setValue, visible, setVisible, options }) => {

    return (
      <Modal 
        animationType='none'
        onRequestClose={() => setVisible(false)}
        transparent={true}
        visible={visible}
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
                <View 
                  style={{
                    alignItems: 'center',
                    backgroundColor: item === value ? 'grey' : '#263238',
                    flexDirection: 'row',
                    height: 53,
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <Text style={styles.settingsSubheading}>{item}</Text>
                </View>
                <View style={styles.separator}/>
              </Pressable>
            )
          })}
          <Pressable onPress={() => setVisible(false)} style={{bottom: 40, position: 'absolute'}}>
            <View style={styles.settingsModalCloseButton}>
              <Text 
                style={{
                  color: 'white', 
                  fontSize: 15, 
                  fontFamily: 'serif', 
                  textAlign: 'center'
                  }}
              >
                Close
              </Text>
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
          onPress={() => setToggleCurrency(!toggleCurrency)}
          title={'Currency'}
          value={currency.toUpperCase()}
        />
        <MenuOptions 
          options={['USD', 'GBP', 'EUR']}
          setValue={setCurrency}
          setVisible={setToggleCurrency}
          title={'Currency'}
          value={currency}
          visible={toggleCurrency}
        />
        <View style={styles.separator}/>
        <SettingsButton 
          onPress={() => setToggleDefaultScreen(!toggleDefaultScreen)}
          title={'Default Screen'}
          value={defaultScreen}
        />

        <MenuOptions 
          options={['Home', 'Markets', 'Exchanges', 'News', 'Settings']}
          setValue={setDefaultScreen}
          setVisible={setToggleDefaultScreen}
          title={'Default Screen'}
          value={defaultScreen}
          visible={toggleDefaultScreen}
        />  

        <Text style={styles.settingsHeading}>Notifications</Text>
        <View style={styles.settingsButton}>
          <Text style={styles.settingsSubheading}>Enable Push Notifications</Text>
          <Switch 
            onValueChange={togglePushNotifications}
            thumbColor={{ false: 'white', true: 'white'}}
            trackColor={{ false: '#b6bab8', true: '#3eb6de'}}
            value={pushNotificationsActive}
          />
        </View>
        <View style={styles.separator} />
        <SettingsButton 
          onPress={() => setTogglePushInterval(!togglePushInterval)}
          title={'Push Notification frequency'}
          value={pushNotifcationsInterval}
        />

        <MenuOptions 
          options={['Daily', 'Weekly', 'Monthly']}
          setValue={setPushNotificationsInterval}
          setVisible={setTogglePushInterval}
          title={'Push notification frequency'}
          value={pushNotifcationsInterval}
          visible={togglePushInterval}
        />  

        <Text style={styles.settingsHeading}>About</Text>
        <SettingsButton title={'Contact Us'} onPress={() => Linking.openURL('mailto: bitcloveruk@gmail.com')}/>
        <View style={styles.separator}/>
        <SettingsButton title={'Privacy Policy'} onPress={() => navigation.navigate('Privacy')} />
        <View style={styles.separator}/>
        <SettingsButton title={'Terms of Use'} onPress={() => navigation.navigate('Terms')}/>
        <View style={styles.separator}/>
        <SettingsButton title={'Rate BitClover'}/>
        <Text style={{fontSize: 15, color: 'white', paddingTop: 10}}>BitClover for Android v1.0.0</Text>
      </View>

    </ScrollView>
  );
};

export default Settings;