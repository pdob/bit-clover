import React from 'react';
import { View, Image } from 'react-native';


const TabBarIcon = ({ focused, iconSrc }) => (
  <View style={{marginTop: 5}}>
    <Image 
      source={iconSrc}
      resizeMode='contain'
      style={{
        height: 22.5,
        width: 22.5,
        alignSelf: 'center',
        tintColor: focused ? 'white' : '#62727b'
      }}
    />  
  </View>
);


export default TabBarIcon;