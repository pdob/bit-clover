import React from 'react';
import { FlatList, SafeAreaView, Text, View, Image } from 'react-native';
import styles from '../config/styles';
import marketData from '../components/marketData';

const endpoint = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h';

const Markets = () => {
  const data = marketData(endpoint);

  const Item = ({ name, rank, price, image, }) => (
    <View style={styles.flatlistContainer}>
      <View>
        <Image 
          style={{height: 50, width: 50}}
          source={{uri: image}}
        />
      </View>
      <View>
        <Text>{rank} {name} {price}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item 
      name={item.name}
      rank={item.market_cap_rank}
      price={item.current_price}
      image={item.image}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={data}
        renderItem={renderItem}
        initialNumToRender={10}
      />
    </SafeAreaView>
  );
};

export default Markets;