import React from 'react';
import Home from '../screens/Home';
import Markets from '../screens/Markets';
import Exchanges from '../screens/Exchanges';
import Settings from '../screens/Settings';
import News from '../screens/News';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBarIcon from '../components/TabBarIcon';
import icons from '../constants/icons';
import {useContext} from 'react';
import {SettingsContext} from '../contexts/SettingsContext';

const Tab = createMaterialTopTabNavigator();

const TabNavigation = () => {
  const {defaultScreen} = useContext(SettingsContext);

  return (
    <Tab.Navigator
      initialRouteName={defaultScreen}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000000',
          height: 50,
        },
        tabBarLabelStyle: {
          fontSize: 7,
          fontFamily: 'notoserif',
          fontWeight: 'bold',
        },
        tabBarContentContainerStyle: {
          alignItems: 'center',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#62727b',
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent',
        },
      }}
      tabBarPosition="bottom">
      <Tab.Screen
        name="Home"
        component={Home}
        path="Home"
        options={{
          tabBarIcon: ({focused}) => 
            <TabBarIcon iconSrc={icons.home} focused={focused} />,
          }}
      />
      <Tab.Screen
        name="Markets"
        component={Markets}
        path="Markets"
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
