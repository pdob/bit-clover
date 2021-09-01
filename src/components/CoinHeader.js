import React from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles, { infoStyles } from '../config/styles';
import icons from '../constants/icons';

const CoinHeader = ({ image, name }) => {

  const navigation = useNavigation();
  return (
    <View style={infoStyles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <View style={{flexDirection: 'row', alignContent: 'flex-start'}}>
          <Image 
            source={icons.back}
            style={infoStyles.headerBack}
          />
        </View>
      </Pressable> 
      <Image 
        source ={{uri: image}}
        style={infoStyles.headerLogo}  
      />
      <Text style={infoStyles.headerTitle}>{name}</Text>
    </View>
  );
};

export default CoinHeader;