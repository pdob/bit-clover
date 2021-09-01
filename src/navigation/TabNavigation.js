import React from 'react';
import Home from '../screens/Home';
import Markets from '../screens/Markets';
import Portfolio from '../screens/Portfolio';
import Settings from '../screens/Settings';
import Watchlist from '../screens/Watchlist';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabBarIcon from '../components/TabBarIcon';
import icons from '../constants/icons';

const Tab = createMaterialTopTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000000',
          height: 50
        },
        tabBarLabelStyle: {
          fontSize: 8,
          fontFamily: 'notoserif',
        },
        tabBarContentContainerStyle: {
          alignItems: 'center'
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#62727b',
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent'
        }, 
      }}
      tabBarPosition='bottom'
    >
      <Tab.Screen name='Home' component={Home} 
        options={{
        tabBarIcon: ({ focused }) => 
          <TabBarIcon 
            iconSrc={icons.home} 
            focused={focused}
          />
        }}
      />
      <Tab.Screen name='Markets' component={Markets}
        options={{
          tabBarIcon: ({ focused }) => 
            <TabBarIcon 
              iconSrc={icons.markets} 
              focused={focused}
            />
        }}
      />
      <Tab.Screen name='Portfolio' component={Portfolio} 
        options={{
          tabBarIcon: ({ focused }) => 
            <TabBarIcon 
              iconSrc={icons.portfolio} 
              focused={focused}
            />
        }}
      />
      <Tab.Screen name='Watchlist' component={Watchlist}
        options={{
          tabBarIcon: ({ focused }) => 
            <TabBarIcon 
              iconSrc={icons.watchlist} 
              focused={focused}
            />
        }}
      />
      <Tab.Screen name='Settings' component={Settings}
        options={{
          tabBarIcon: ({ focused }) => 
            <TabBarIcon 
              iconSrc={icons.settings} 
              focused={focused}
            />
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
