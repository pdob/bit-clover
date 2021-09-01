import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import DisplayCoinInfo from '../screens/DisplayCoinInfo';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='Root'
    >
      <Stack.Screen name='Root' component={TabNavigation} options={{
        headerShown: false
      }}/>
      <Stack.Screen name='CoinInfo' component={DisplayCoinInfo} options={{headerShown: false}}/> 
    </Stack.Navigator>
  );


};

export default StackNavigation;