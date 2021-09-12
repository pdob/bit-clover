import React from 'react';
import { Text, View } from 'react-native';
import styles from '../config/styles';
import { getBle } from './Settings';

const Watchlist = () => {
  return (
    <View style={styles.container}>
      <Text>Watchlist {getBle()}</Text>
    </View>
  );
};

export default Watchlist;