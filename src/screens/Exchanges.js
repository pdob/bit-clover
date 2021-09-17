import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, Pressable, Dimensions } from 'react-native';
import styles from '../config/styles';
import numbro from 'numbro';
import * as WebBrowser from 'expo-web-browser';

const endpoint = 'https://api.coingecko.com/api/v3/exchanges?per_page=50';
const btcendpoint = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd%2Ceur%2Cgbp';
const SIZE = Dimensions.get('window');

const Exchanges = () => {
  const [data, setData] = useState([]);
  const [btcPrice, setBtcPrice] = useState({});
  const [isLoading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch(endpoint);
      const json = await response.json();
      const btc = await fetch(btcendpoint);
      const btcJson = await btc.json();
      setData(json);
      setBtcPrice(btcJson.bitcoin);
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

  const Item = ({ title, image, rank, country, volume, year, url}) => {
    return (
      <View style={styles.flatlistContainer}>
        <Pressable 
          style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
          onPress={() => WebBrowser.openBrowserAsync(url)}
        >
          <View style={{width: SIZE.width / 3, flexDirection: 'row'}}>
            <Image 
              style={{
                height: 20,
                width: 20
              }}
              source={{
                uri: image
              }}
            />

            <Text style={styles.flatlistText}>{rank}. {title}</Text>
          </View>
          <View style={{width: SIZE.width / 3}}>
            <Text style={styles.flatlistText}>
              {'\n'}Country:{'\n'}{country}{'\n'}Opened: {year}{'\n'}
            </Text>
          </View>
          <View style={{width: SIZE.width / 3}}>
            <Text style={styles.flatlistText}>
              24h volume: {'\n'}BTC: {volume.toFixed(2)}{'\n'}
              USD: {numbro(volume * btcPrice.usd).formatCurrency({ average: true, mantissa: 2})}
            </Text>
          </View>
        </Pressable>
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
      url={item.url}
    />
  );

  const Separator = () => (
    <View style={{height: 0.4, color: 'grey'}}></View>
  )

  return (
    <View style={styles.container}>
      <FlatList 
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

export default Exchanges;