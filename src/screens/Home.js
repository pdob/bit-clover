import React from 'react';
import { View, Text, FlatList, Image, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from '../config/styles';
import marketData from '../components/marketData';
import Header from '../components/AppHeader';

const endpoint = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h';

const Home = () => {
  const data = marketData(endpoint);
  const topDailyData = data.slice().sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  const lossDailyData = data.slice().sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);

  const navigation = useNavigation();

  const Item = ({ name, image, price, change, id }) => (
    <Pressable onPress={() => navigation.navigate('CoinInfo', {
      name,
      image,
      id,
      price
    })}>
      <View style={styles.horizontalFlatListContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image 
            style={{height: 20, width: 20, marginRight: 5}}
            source={{uri: image}}
          />
          <Text style={styles.horizontalFlatListTitle}>{name}</Text>
        </View>
        <View>
          <Text style={styles.horizontalFlatListText}
            numberOfLines={2}
          >{price.toFixed(2)} USD</Text>
          <Text style={{color: change > 0 ? 'green' : 'red'}}>{change.toFixed(3)}%</Text>
        </View>
      </View>
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <Item 
      name={item.name}
      price={item.current_price}
      image={item.image}
      change={item.price_change_percentage_24h}
      id={item.id}
    />
  );


  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text style={styles.sectionTitle}>Most Popular Coins</Text>
      <FlatList 
        data={data.slice(0, 20)}
        renderItem={renderItem}
        horizontal={true}
      />

      <Text style={styles.sectionTitle}>Top Gainers</Text>
      <FlatList 
        data={topDailyData.slice(0, 20)}
        renderItem={renderItem}
        horizontal={true}
      />

      <Text style={styles.sectionTitle}>Biggest Losers</Text>
      <FlatList 
        data={lossDailyData.slice(0, 20)}
        renderItem={renderItem}
        horizontal={true}
      />
    </ScrollView>
  );
};

export default Home;