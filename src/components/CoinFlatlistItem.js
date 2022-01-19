import React, {useContext} from 'react';
import {Pressable, View, Text, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import { SettingsContext } from '../contexts/SettingsContext';

const CoinFlatListItem = props => {
  const navigation = useNavigation();
  const {currencySymbol} = useContext(SettingsContext);
  return (
    <Pressable
      style={styles.flatlistItem}
      onPress={() =>
        navigation.navigate('CoinInfo', {
          id: props.id,
          name: props.name,
          image: props.image,
          price: props.price,
        })
      }>
      <View style={styles.titleContainer}>
        <Text style={styles.rankText}>{props.rank}.</Text>
        <Image source={{uri: props.image}} style={styles.flatlistImage} />
        <Text style={styles.flatlistTitle}>
          {props.name}
          {'\n'}
          <Text style={styles.symbol}>{props.symbol.toUpperCase()}</Text>
        </Text>
      </View>
      <View style={styles.percentageContainer}>
        <Image
          style={styles.priceIcon}
          source={
            props.percentage > 0
              ? require('../assets/price-arrow-up.png')
              : require('../assets/price-arrow-down.png')
          }
        />
        <Text
          style={[
            styles.priceText,
            // eslint-disable-next-line react-native/no-inline-styles
            {color: props.percentage > 0 ? 'green' : 'red'},
          ]}>
          {props.percentage > 0 && '+'}
          {props.percentage.toFixed(2)}%
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text
          style={[
            styles.priceText,
            // eslint-disable-next-line react-native/no-inline-styles
            {color: props.percentage > 0 ? 'green' : 'red'},
          ]}>
          {currencySymbol}{props.price.toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  flatlistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65,
  },
  flatlistImage: {
    height: 25,
    width: 25,
  },
  flatlistTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
    paddingLeft: 10,
    flex: 1,
  },
  percentageContainer: {
    width: '30%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  priceContainer: {
    width: '30%',
    alignItems: 'center',
  },
  priceIcon: {
    height: 15,
    width: 15,
    marginRight: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
  },
  rankText: {
    color: '#b6bab8',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingRight: 10,
  },
  separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'grey',
  },
  symbol: {
    color: '#b6bab8',
    fontWeight: 'bold',
    fontSize: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
});

export default CoinFlatListItem;
