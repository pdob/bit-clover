import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import DisplayCoinInfo from '../screens/DisplayCoinInfo';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Terms from '../screens/Terms';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='Root'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#263238'
        },
        headerTitleStyle: {
          color: 'white'
        }
      }}
    >
      <Stack.Screen name='Root' component={TabNavigation} options={{
        headerShown: false
      }}/>
      <Stack.Screen name='CoinInfo' component={DisplayCoinInfo} options={{headerShown: false}}/> 
      <Stack.Screen name='Privacy' component={PrivacyPolicy} />
      <Stack.Screen name='Terms' component={Terms} />
    </Stack.Navigator>
  );


};

export default StackNavigation;