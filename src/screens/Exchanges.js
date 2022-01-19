import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import numbro from 'numbro';
import * as WebBrowser from 'expo-web-browser';
import {SettingsContext} from '../contexts/SettingsContext';
import Separator from '../components/Separator';

const endpoint = 'https://api.coingecko.com/api/v3/exchanges?per_page=50';
const btcendpoint =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd%2Ceur%2Cgbp';
const SIZE = Dimensions.get('window');

const Exchanges = () => {
  const [data, setData] = useState([]);
  const [btcPrice, setBtcPrice] = useState({});
  const {currency, currencySymbol} = useContext(SettingsContext);

  const getData = async () => {
    try {
      const response = await fetch(endpoint);
      const json = await response.json();
      const btc = await fetch(btcendpoint);
      const btcJson = await btc.json();
      setData(json);
      setBtcPrice(btcJson.bitcoin);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const Item = ({title, image, rank, volume, url, country}) => {
    return (
      <View style={styles.flatlistContainer}>
        <Pressable
          style={styles.flatlistItem}
          onPress={() => WebBrowser.openBrowserAsync(url)}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: image,
              }}
            />

            <Text style={styles.statsText}>
              {rank}. {title}
              {'\n'}
              <Text style={styles.flatlistSubheading}>{country}</Text>
            </Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.flatlistText}>
              24h volume: {'\n'}
              <Text style={styles.flatlistSubheading}>
                BTC: {volume.toFixed(1)}
                {'\n'}
                {currency}:{' '}
                {numbro(
                  volume * btcPrice[currency.toLowerCase()],
                ).formatCurrency({
                  average: true,
                  mantissa: 2,
                  currencySymbol: currencySymbol,
                })}
              </Text>
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };

  const renderItem = ({item}) => (
    <Item
      country={item.country}
      image={item.image}
      rank={item.trust_score_rank}
      volume={item.trade_volume_24h_btc}
      title={item.name}
      url={item.url}
    />
  );

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263238',
  },
  flatlistContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  flatlistItem: {
    alignItems: 'center',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  flatlistText: {
    color: 'white',
    fontFamily: 'serif',
    fontSize: 14,
    paddingLeft: 8,
  },
  flatlistSubheading: {
    color: '#b6bab8',
    fontFamily: 'serif',
    fontSize: 13,
    fontWeight: 'bold',
  },
  image: {
    height: 25,
    width: 25,
    marginRight: 10,
    marginTop: 5,
  },
  imageContainer: {
    width: SIZE.width / 2,
    flexDirection: 'row',
  },
  stats: {
    width: SIZE.width / 3.5,
  },
  statsText: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 18,
  },
});

export default Exchanges;
