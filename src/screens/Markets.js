import React from 'react';
import { FlatList, SafeAreaView, Text, View, Image, Pressable } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from '../config/styles';
import marketData from '../components/marketData';
import { useNavigation } from '@react-navigation/core';
import numbro from 'numbro';

const endpoint = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d';

const Markets = () => {
  const data = marketData(endpoint);
  const navigation = useNavigation();

  const Item = ({ name, rank, price, percentage, image, sparkline, id }) => (
    <View style={styles.flatlistContainer}>
      <Pressable 
        style={{flexDirection: 'row', justifyContent: 'space-between'}}
        onPress={() => navigation.navigate('CoinInfo', {
          name,
          image,
          id,
          price
        })
      }
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image 
              style={{height: 20, width: 20}}
              source={{uri: image}}
          />
          <Text style={styles.flatlistText}>
            {rank} {name}{'\n'}
            {numbro(price).formatCurrency({ thousandSeparated: true, mantissa: 2})}
          </Text>
        </View>
        <View>
          <LineChart 
            withDots={false}
            withHorizontalLabels={false}
            withVerticalLabels={false}
            withInnerLines={false}
            withVerticalLines={false}
            withOuterLines={false}
            data={{
              datasets: [
                {
                  data: sparkline
                }
              ]
            }}
            width={70}
            height={60}
            chartConfig={{
              color: () => percentage > 0 ? 'green' : 'red',
              strokeWidth: 0.9
            }}
            bezier
            style={{
              paddingRight: 0,
              paddingBottom: 5
            }}
          />
        </View>
        <View style={{paddingRight: 20, justifyContent: 'center'}}>
          <Text style={{color: percentage > 0 ? 'green' : 'red'}}>{percentage > 0 ? '+' : ''}{percentage.toFixed(2)}%</Text>
        </View>
      </Pressable>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item 
      id={item.id}
      name={item.name}
      rank={item.market_cap_rank}
      price={item.current_price}
      image={item.image}
      sparkline={item.sparkline_in_7d.price}
      percentage={item.price_change_percentage_24h}
    />
  );

  

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={data}
        renderItem={renderItem}
        initialNumToRender={10}
        ItemSeparatorComponent={Separator}
      />
    </SafeAreaView>
  );
};

export default Markets;