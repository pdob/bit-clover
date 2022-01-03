import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text
} from 'react-native';



const MarketSortButton = ({ sortVal, onPress, sortBy }) => (
  <Pressable 
    style={[styles.button, {backgroundColor: sortBy === sortVal ? 'grey' : '#263238'}]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{sortVal}</Text>
  </Pressable>
);


const styles = StyleSheet.create({
  button: {
    borderRadius: 15, 
    height: 45, 
    justifyContent: 'center',
    padding: 10 
  },
  buttonText: {
    color: 'white', 
    fontSize: 12, 
    fontWeight: 'bold', 
    textAlign: 'center'
  },
});

export default MarketSortButton;