import React from 'react';
import Home from '../screens/Home';
import Markets from '../screens/Markets';
import Exchanges from '../screens/Exchanges';
import Settings from '../screens/Settings';
import News from '../screens/News';
import TabBarIcon from '../components/TabBarIcon';
import icons from '../constants/icons';
import {useContext} from 'react';
import {SettingsContext} from '../contexts/SettingsContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { defaultScreen } = useContext(SettingsContext);

  return (
    <Tab.Navigator
      initialRouteName={defaultScreen}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000000',
          height: 50,
          borderTopWidth: 0
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'notoserif',
          fontWeight: 'bold',
          paddingBottom: 3
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#62727b',
        headerShown: false
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => 
            <TabBarIcon iconSrc={icons.home} focused={focused} />,
          }}
      />
      <Tab.Screen
        name="Markets"
        component={Markets}
        options={{
          tabBarIcon: ({focused}) => 
            <TabBarIcon iconSrc={icons.markets} focused={focused} />,
          }}
      />
      <Tab.Screen
        name="Exchanges"
        component={Exchanges}
        options={{
          tabBarIcon: ({focused}) => 
            <TabBarIcon iconSrc={icons.exchanges} focused={focused} />,
          }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarIcon: ({focused}) => 
            <TabBarIcon iconSrc={icons.news} focused={focused} />,
          }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => 
            <TabBarIcon iconSrc={icons.settings} focused={focused} />,     
          }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
