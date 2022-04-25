import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ShowPriceInfo = props => (
  <View style={styles.priceContainer}>
    <Text style={styles.coinTitle}>{props.name} price</Text>
    <Text style={styles.priceText}>{props.currencySymbol}{props.price.toFixed(props.price < 0.05 ? 10 : props.price > 0.05 && props.price < 1 ? 4 : 2)} {props.currency}</Text>
    <Text
      style={[
        styles.percentageText,
        {color: props.priceChange > 0 ? 'green' : 'red'},
      ]}>
      {props.priceChange > 0 ? '+' : ''}{props.currencySymbol}{props.priceChange.toFixed(props.price > 1 ? 2 : 4)}
      {` (${props.percentageChange.toFixed(2)})`}%
    </Text>
  </View>
);

const styles = StyleSheet.create({
  coinTitle: {
    color: 'white',
    fontSize: 22,
  },
  percentageText: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '700',
    color: 'white',
  },
  priceContainer: {
    backgroundColor: '#102027',
    height: 120,
    padding: 10,
  },
  priceText: {
    color: 'white',
    fontSize: 35,
    fontWeight: '600',
  },
});

export default ShowPriceInfo;