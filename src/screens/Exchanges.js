import React, { 
  useContext, 
  useEffect, 
  useState 
} from 'react';
import { 
  FlatList, 
  Image, 
  Pressable, 
  Text, 
  View 
} from 'react-native';
import styles, { infoStyles } from '../config/styles';
import numbro from 'numbro';
import * as WebBrowser from 'expo-web-browser';
import { SettingsContext } from '../contexts/SettingsContext';

const endpoint = 'https://api.coingecko.com/api/v3/exchanges?per_page=50';
const btcendpoint = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd%2Ceur%2Cgbp';

const Exchanges = () => {
  const [data, setData] = useState([]);
  const [btcPrice, setBtcPrice] = useState({});
  const { currency, currencySymbol, SIZE } = useContext(SettingsContext);
  
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
    } 
  }

  useEffect(() => {
    getData();
  }, []);

  const Item = ({ title, image, rank, volume, url, country}) => {
    return (
      <View style={styles.flatlistContainer}>
        <Pressable 
          style={{
            alignItems: 'center',
            height: 70, 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            marginRight: 10
          }}
          onPress={() => WebBrowser.openBrowserAsync(url)}
        >
          <View style={{width: SIZE.width / 2, flexDirection: 'row'}}>
            <Image 
              style={{
                height: 25,
                width: 25,
                marginRight: 5
              }}
              source={{
                uri: image
              }}
            />

            <Text style={infoStyles.statsText}>{rank}. {title}{'\n'}
              <Text style={styles.flatlistSubheading}>{country}</Text>
            </Text>
            
          </View>
          <View style={{width: SIZE.width / 3.5}}>
            <Text style={styles.flatlistText}>
              24h volume: {'\n'}
              <Text style={styles.flatlistSubheading}>
                BTC: {volume.toFixed(1)}{'\n'}
                {currency}: {
                  numbro(volume * btcPrice[currency.toLowerCase()]).formatCurrency({ 
                    average: true, 
                    mantissa: 2, 
                    currencySymbol: currencySymbol
                  })
                }
              </Text>
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
      volume={item.trade_volume_24h_btc}
      title={item.name}
      url={item.url}
    />
  );

  const Separator = () => (
    <View style={{height: 0.4, color: 'grey'}} />
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