import React from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import styles from '../config/styles';
import marketData from '../components/marketData';

const endpoint = 'https://api.coingecko.com/api/v3/exchanges?per_page=50';

const Exchanges = () => {
  const data = marketData(endpoint);
  

  const Item = ({ title, image, rank, country, volume, year}) => {
    return(
      <View>
        <Image 
          style={{
            height: 30,
            width: 30
          }}
          source={{
            uri: image
          }}
        />

        <Text>{rank}. {title}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Item 
      country={item.country}
      image={item.image}
      rank={item.trust_score_rank}
      title={item.name}
      volume={item.trade_volume_24h_btc}
      year={item.year_established}
    />
  );


  return (
    <View style={styles.container}>
      <FlatList 
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Exchanges;