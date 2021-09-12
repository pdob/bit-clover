import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import styles from '../config/styles';

let bigG = ' O ';

const Settings = () => {
   
  const [currency, setCurrency] = useState({
    currency: 'usd'
  });
  bigG = currency.currency;
  
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
};
console.log(bigG);

export const getBle = () => {
  return bigG;
}

export default Settings;