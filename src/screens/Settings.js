import React, { 
  useContext, 
  useEffect,
  useState
} from 'react';
import {
  Dimensions, 
  Modal, 
  Pressable, 
  ScrollView,
  StyleSheet, 
  Switch, 
  Text, 
  View, 
} from 'react-native';
import * as Linking from 'expo-linking';
import AppHeader from '../components/AppHeader';
import Separator from '../components/Separator';
import { SettingsContext } from '../contexts/SettingsContext';
import { useNavigation } from '@react-navigation/core';
import * as Notifications from 'expo-notifications';
import { LinearGradient } from 'expo-linear-gradient';
import { makeRequest } from '../api';

const SIZE = Dimensions.get('window');

const Settings = () => {
  
  {/** Import and destructure values and setters from the Settings Context */}
  
  const { 
    currency, 
    setCurrency,
    setCurrencyValue, 
    defaultScreen,
    setDefaultScreen,
    setDefaultScreenValue, 
    pushNotificationsActive, 
    setPushNotificationsActive,
    setPushNotificationsActiveValue,
  } = useContext(SettingsContext); 
  
  const endpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C30d`;
  const navigation = useNavigation();
  const [toggleCurrency, setToggleCurrency] = useState(false);
  const [toggleDefaultScreen, setToggleDefaultScreen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const topDailyData = data.filter(item => (item.price_change_percentage_24h > 10 || item.price_change_percentage_24h < -10));

  
  const getData = async () => {
    try {
      makeRequest({path: `/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C30d`})
      .then(response => response.json())
      .then(json => setData(json))
    }
    catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
    if(!isLoading && topDailyData.length > 0) {
      scheduleNotifications(topDailyData[Math.floor(Math.random() * topDailyData.length)]);
    }
  }, [pushNotificationsActive, endpoint]);


  {/* Set up local push notifications if push notifications are active */}
  
  const scheduleNotifications = async (item) => {
    let noOfNotifications = await Notifications.getAllScheduledNotificationsAsync();
    if(noOfNotifications.length > 1) {
      Notifications.cancelAllScheduledNotificationsAsync();
    }
    if(pushNotificationsActive){
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Price Alert!',
          body: `${item.name} is ${item.price_change_percentage_24h > 0 ? 'up' : 'down'}` + 
          ` ${item.price_change_percentage_24h.toFixed(2)}% in the last 24 hours to ${item.current_price.toFixed(3)} ${currency}`
        },
        trigger: {
          seconds: 60 * Math.floor(Math.random() * 1440),
          repeats: false,
        },
      });  
    } else {
      Notifications.cancelAllScheduledNotificationsAsync();
    }
  }

  const togglePushNotifications = () => { 
    setPushNotificationsActive(!pushNotificationsActive);
    setPushNotificationsActiveValue(!pushNotificationsActive);
  }

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


  const MenuOptions = ({ value, title, setValue, visible, setVisible, options, setAsyncValue }) => {

    return (
      <Modal 
        animationType='none'
        onRequestClose={() => setVisible(false)}
        transparent={true}
        visible={visible}
      >
        <View style={styles.settingsModal}>
          <View style={styles.settingsHeadingContainer}>
            <Text style={styles.settingsHeading}>{title}</Text>
          </View>
          {options.map((item, index) => {
            return (
              <Pressable 
                key={index} 
                onPress={() => {
                  setAsyncValue(item)
                  setValue(item)
                  setVisible(false)
                }}
              >
                <View style={[styles.settingsModalOptions, {backgroundColor: item === value ? 'grey' : '#263238'}]}>
                  <Text style={styles.settingsSubheading}>{item}</Text>
                </View>
                <Separator />
              </Pressable>
            )
          })}
          <Pressable 
            onPress={() => setVisible(false)} 
            style={[styles.settingsModalCloseButton]}
          >
            <Text style={styles.closeButtonText}>Close </Text>
          </Pressable>
        </View>
      </Modal>
    );
  }

  return (
    <LinearGradient 
      colors={['#102027','#374851']}
      style={styles.container}
    >
      <ScrollView >
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
            setAsyncValue={setCurrencyValue}
            setValue={setCurrency}
            setVisible={setToggleCurrency}
            title={'Currency'}
            value={currency}
            visible={toggleCurrency}
          />

          <Separator />
          <SettingsButton 
            onPress={() => setToggleDefaultScreen(!toggleDefaultScreen)}
            title={'Default Screen'}
            value={defaultScreen}
          />

          <MenuOptions 
            options={['Home', 'Markets', 'Exchanges', 'News', 'Settings']}
            setAsyncValue={setDefaultScreenValue}
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
          <Separator />

          <Text style={styles.settingsHeading}>About</Text>
          <SettingsButton title={'Contact Us'} onPress={() => Linking.openURL('mailto: bitcloveruk@gmail.com')}/>
          <View style={styles.separator} />
          <SettingsButton title={'Privacy Policy'} onPress={() => navigation.navigate('Privacy')} />
          <View style={styles.separator}/>
          <SettingsButton title={'Terms of Use'} onPress={() => navigation.navigate('Terms')}/>
          <View style={styles.separator}/>
          <SettingsButton title={'Rate BitClover'} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.pdob.bitclover&hl=en_GB&gl=US')}/>
          <Text style={styles.versionText}> BitClover for Android v2.0</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263238',
  },
  closeButtonText: {
    color: 'white', 
    fontSize: 15, 
    fontFamily: 'serif', 
    textAlign: 'center'
  },
  separator: {
    backgroundColor: '#1b1b1c',
    height: 0.7,
    width: '100%'
  },
  settingsButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 4,
    flexDirection: 'row',
    height: 53,
    justifyContent: 'space-between',
    width: '100%'
  },  
  settingsContainer: {
    flex: 1,
    padding: 10
  },
  settingsHeading: {
    color: 'white',
    fontFamily: 'serif',
    fontSize: 25,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginTop: SIZE.height > 700 ? 15 : 0,
    paddingBottom: 10,
    paddingTop: 10
  },
  settingsHeadingContainer: {
    backgroundColor: 'black', 
    width: '100%'
  },
  settingsModal: {
    backgroundColor: 'black',
    height: SIZE.height,
    opacity: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  settingsModalButton: {
    alignItems: 'center',
    backgroundColor: '#263238',
    borderRadius: 5,
    flexDirection: 'row',
    height: 53,
    justifyContent: 'space-between',
    width: '100%'
  },
  settingsModalCloseButton: {
    backgroundColor: '#263238',
    borderRadius: 10,
    marginLeft: SIZE.width - 85,
    padding: 8,
    width: 70,
    bottom: 40, 
    position: 'absolute'
  },
  settingsModalOptions: {
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    height: 53,
    justifyContent: 'space-between',
    width: '100%'
  },  
  settingsValue: {
    color: '#b6bab8',
    fontFamily: 'serif',
    fontSize: 15,
    paddingRight: 10
  },
  settingsSubheading: {
    color: 'white',
    fontFamily: 'serif',
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  versionText: {
    fontSize: 17, 
    color: 'white', 
    paddingTop: 40
  }
});

export default Settings;