import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, View, FlatList, Image, Pressable } from 'react-native';
import styles from '../config/styles';


const endpoint = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h';
import { SettingsContext } from './Settings';

const Watchlist = () => {
  const settings = useContext(SettingsContext);
  const [data, setData] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const response = await fetch(endpoint);
      const json = await response.json();
      setData(json.map(item => ({
        id: item.id,
        image: item.image,
        high24h: item.high_24h,
        low24h: item.low_24h,
        name: item.name,
        percentChange: item.price_change_percentage_24h,
        price: item.current_price,
        priceChange: item.price_change_24h,
        rank: item.market_cap_rank,
      })));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(settings);

  const Item = ({ id, image, high24h, low24h, name, percentChange, price, priceChange, rank, watchlist }) => {
    return (
      <View style={styles.flatlistContainer}>
        <Pressable 
          style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
          onPress={() => navigation.navigate('CoinInfo', {
            id,
            image,
            name,
            price
          })}
        >
          <View>
            <Image 
              style={{
                height: 20,
                width: 20
              }}
              source={{
                uri: image
              }}
            />

            <Text style={styles.flatlistText}>{rank}. {name}</Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Watchlist nyg</Text>
    </View>
  );
};

export default Watchlist;