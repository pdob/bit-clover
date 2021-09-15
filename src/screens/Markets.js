import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View, Image, Pressable, Modal, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from '../config/styles';
import { useNavigation } from '@react-navigation/core';
import numbro from 'numbro';

const endpoint = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d';
const SIZE = Dimensions.get('window');

const Markets = () => {

  const [data, setData] = useState([]);
  const marketCapDesc = data.slice().sort((a, b) => a.rank - b.rank);
  const marketCapAsc = data.slice().sort((a, b) => b.rank - a.rank);
  const priceAsc = data.slice().sort((a, b) => a.price - b.price);
  const priceDesc = data.slice().sort((a, b) => b.price - a.price);
  const percent24Asc = data.slice().sort((a, b) => a.percentage24h - b.percentage24h);
  const percent24Desc = data.slice().sort((a, b) => b.percentage24h - a.percentage24h);
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [percentage, setPercentage] = useState(24);
  const [sortBy, setSortBy] = useState('Market Cap High');

  const getData = async () => {
    try {
      const response = await fetch(endpoint)
      const json = await response.json();
      setData(json.map(item => ({
        id: item.id,
        image: item.image,
        name: item.name,
        percentage1h: item.price_change_percentage_1h_in_currency,
        percentage24h: item.price_change_percentage_24h,
        percentage7d: item.price_change_percentage_7d_in_currency,
        percentage14d: item.price_change_percentage_14d_in_currency,
        percentage30d: item.price_change_percentage_30d_in_currency,
        price: item.current_price,
        rank: item.market_cap_rank,   
        sparkline: item.sparkline_in_7d.price,
        symbol: item.symbol
      })));
    }
    catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);



  const PercentButton = ({ percent, label, onPress }) => (
    <Pressable 
      style={{padding: 10, backgroundColor: percentage === percent ? 'grey' : '#263238', borderRadius: 10}}
      onPress={onPress}
    >
      <Text style={styles.marketHeaderButtonText}>{label}</Text>
    </Pressable>
  );

  const SortButton = ({sortVal, onPress }) => (
    <Pressable 
      style={{height: 45, padding: 10, backgroundColor: sortBy === sortVal ? 'grey' : '#263238', borderRadius: 10, justifyContent: 'center'}}
      onPress={onPress}
    >
      <Text style={styles.marketHeaderButtonText}>{sortVal}</Text>
    </Pressable>
  );

  const MarketHeader = () => {
    const [percentageVisible, setPercentageVisible] = useState(false);
    const [sortByVisible, setSortByVisible] = useState(false);

    return (
      <View style={styles.marketHeaderBar}>
        <Pressable style={styles.marketHeaderButtons} onPress={() => setSortByVisible(!sortByVisible)}>
          <Text style={{color: 'white'}}>Sort by</Text>
        </Pressable>
        <Pressable style={styles.marketHeaderButtons} onPress={() => setPercentageVisible(!percentageVisible)}>
          <Text style={{color: 'white', fontSize: 12}}>% Change</Text>
        </Pressable>

        <Modal
          animationType='fade'
          transparent={true}
          visible={percentageVisible}
          onRequestClose={() => setPercentageVisible(false)}
        >
          <View style={{height: 180, width: 80, backgroundColor: '#263238', borderRadius: 10, marginLeft: SIZE.width-75}}>
            <PercentButton percent={1} label={'1H'} onPress={() => setPercentage(1)}/>
            <PercentButton percent={24} label={'24H'} onPress={() => setPercentage(24)}/>
            <PercentButton percent={7} label={'7D'} onPress={() => setPercentage(7)}/>
            <PercentButton percent={14} label={'14D'} onPress={() => setPercentage(14)}/>
            <PercentButton percent={30} label={'30D'} onPress={() => setPercentage(30)}/>      
          </View>
        </Modal>

        <Modal
          animationType='fade'
          transparent={true}
          visible={sortByVisible}
          onRequestClose={() => setSortByVisible(false)}
        >
          <View style={{height: 250, width: 80, backgroundColor: '#263238', borderRadius: 10}}>
            <SortButton sortVal={'Market Cap High'} onPress={() => {
              setData(marketCapDesc);
              setSortBy('Market Cap High');
            }}/> 
            <SortButton sortVal={'Market Cap Low'} onPress={() => {
              setData(marketCapAsc);
              setSortBy('Market Cap Low');
            }}/> 
            <SortButton sortVal={'Price High'} onPress={() => {
              setData(priceDesc);
              setSortBy('Price High');
            }}/> 
            <SortButton sortVal={'Price Low'} onPress={() => {
              setData(priceAsc);
              setSortBy('Price Low');
            }}/> 
            <SortButton sortVal={'24H Gain'} onPress={() => {
              setData(percent24Desc);
              setSortBy('24H Gain');
            }}/> 
            <SortButton sortVal={'24H Loss'} onPress={() => {
              setData(percent24Asc);
              setSortBy('24H Loss');
            }}/> 
          </View>
        </Modal>
      </View>
    )
  };


  const Item = ({ name, rank, symbol, percentage1h, percentage24h, percentage7d, percentage14d, percentage30d, price, image, sparkline, id }) => {

    let percentageShown = [];

    switch(percentage) {
      case 1:
        percentageShown = percentage1h;
        break;
      case 7:
        percentageShown = percentage7d;
        break;
      case 14:
        percentageShown = percentage14d;
        break;
      case 24:
        percentageShown = percentage24h;
        break;
      case 30:
        percentageShown = percentage30d;
        break;
    }

    return (
      <View style={styles.flatlistContainer}>
        <Pressable 
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
          onPress={() => navigation.navigate('CoinInfo', {
            name,
            image,
            id,
            price
          })
        }>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image 
                style={{height: 20, width: 20}}
                source={{uri: image}}
            />
            <Text style={styles.flatlistText}>
              {rank} {name}{'\n'}
              <Text style={{color: '#b6bab8', fontWeight: 'bold', fontSize: 12}}>{symbol.toUpperCase()}{'\n'}</Text>             
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
                color: () => percentage24h > 0 ? 'green' : 'red',
                strokeWidth: 0.9
              }}
              bezier
              style={{
                paddingRight: 0,
                paddingBottom: 5
              }}
            />
          </View>
          <View style={{paddingRight: 15, justifyContent: 'center'}}>
            <Text style={{color: percentageShown > 0 ? 'green' : 'red'}}>{percentageShown > 0 ? '+' : ''}{percentageShown.toFixed(2)}%</Text>
          </View>
        </Pressable>
      </View>
    )};

  
  
  const renderItem = ({ item }) => {
    return (
      <Item 
        id={item.id}
        name={item.name}
        rank={item.rank}
        price={item.price}
        image={item.image}
        sparkline={item.sparkline}
        percentage1h={item.percentage1h}
        percentage24h={item.percentage24h}
        percentage7d={item.percentage7d}
        percentage14d={item.percentage14d}
        percentage30d={item.percentage30d}
        symbol={item.symbol}
      />
  )};

  const getItemLayout = (data, index) => {
    return {
      length: 75,
      offset: 75 * index, 
      index
    }
  }

  const Separator = () => (
    <View style={{height: 0.4, color: 'grey'}}></View>
  )

  return (  
    <SafeAreaView style={styles.container}> 
      {isLoading ? <ActivityIndicator color='grey' size='large'/> : ( 
        <View>
          <FlatList 
            ListHeaderComponent={MarketHeader}
            data={data}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            keyExtractor={item => item.id}
            removeClippedSubviews={true}
            windowSize={15}
            initialNumToRender={10}
            ItemSeparatorComponent={Separator}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Markets;