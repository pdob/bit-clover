import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, View, FlatList, Image, Pressable, Settings } from 'react-native';
import styles from '../config/styles';
import { SettingsContext } from '../contexts/SettingsContext';



const endpoint = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h';

const Watchlist = () => {

  const [data, setData] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const navigation = useNavigation();
  const { pushNotificationsActive, currency, defaultScreen } = useContext(SettingsContext);

  
  const getData = async () => {
    try {
      const response = await fetch(endpoint);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'white'}}>{currency}</Text>
    </View>
  );
};

export default Watchlist;