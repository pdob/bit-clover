import React, { 
  useContext,
  useEffect,
  useState 
} from 'react';
import { 
  FlatList, 
  Image, 
  Pressable, 
  ScrollView, 
  View, 
  Text 
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from '../config/styles';
import Header from '../components/AppHeader';
import { SettingsContext } from '../contexts/SettingsContext';

const Home = () => {
  
  const { currency, SIZE } = useContext(SettingsContext);
  const endpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;
  
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  
  {/** Sort data based on gains and losses */}
  const topDailyData = data.slice().sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  const lossDailyData = data.slice().sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);

  {/* Function to get data from API, re-render if user changes currency in settings */}

  const getData = async () => {
    try {
      const response = await fetch(endpoint);
      const json = await response.json();
      setData(json);
    }
    catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getData();
  }, [endpoint]);

  

  const Item = ({ name, image, price, change, id }) => (
    <Pressable onPress={() => navigation.navigate('CoinInfo', {
      name,
      image,
      id,
      price
    })}
    >
      <View style={styles.horizontalFlatListContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image 
            style={{height: 21, width: 21, marginRight: 4}}
            source={{uri: image}}
          />
          <Text style={styles.horizontalFlatListTitle}>{name}</Text>
        </View>
        <View>
          <Text 
            style={styles.horizontalFlatListText}
            numberOfLines={2}
          >
            {price.toFixed(2)} {currency}
          </Text>
          <Text style={{
            color: change > 0 ? 'green' : 'red',
            fontSize: 15
          }}
          >
            {change.toFixed(3)}%
          </Text>
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
      <View style={{height: SIZE.height / 3.5, marginTop: SIZE.height > 700 ? 15 : 0}}>
        <Text style={styles.sectionTitle}>Most Popular Coins</Text>
        <FlatList 
          data={data.slice(0, 20)}
          renderItem={renderItem}
          horizontal={true}
        />
      </View>
      <View style={{height: SIZE.height / 3.5}}>
        <Text style={styles.sectionTitle}>Top Gainers</Text>
        <FlatList 
          data={topDailyData.slice(0, 20)}
          renderItem={renderItem}
          horizontal={true}
        />
      </View>
      <View style={{height: SIZE.height / 3.5}}>
        <Text style={styles.sectionTitle}>Biggest Losers</Text>
        <FlatList 
          data={lossDailyData.slice(0, 20)}
          renderItem={renderItem}
          horizontal={true}
        />
      </View>
    </ScrollView>
  );
};

export default Home;