import React, { 
  useCallback,
  useContext,
  useEffect,
  useState 
} from 'react';
import { 
  ActivityIndicator,
  Dimensions,
  FlatList, 
  Image, 
  Pressable, 
  ScrollView,
  StyleSheet, 
  View, 
  Text 
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Header from '../components/AppHeader';
import { SettingsContext } from '../contexts/SettingsContext';
const SIZE = Dimensions.get('window');

const Home = () => {
   
  const { currency } = useContext(SettingsContext);

  const endpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;
  
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [endpoint, isLoading]);

  
  const Item = React.memo(({ name, image, price, change, id }) => (
    <Pressable onPress={() => navigation.navigate('CoinInfo', {
      name,
      image,
      id,
      price
    })}
    >
      <View style={styles.horizontalFlatListContainer}>
        <View style={styles.imageContainer}>
          <Image 
            style={styles.image}
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
  ));

  
  const renderItem = useCallback(({ item }) => (
    <Item 
      name={item.name}
      price={item.current_price}
      image={item.image}
      change={item.price_change_percentage_24h}
      id={item.id}
    />
  ), [currency]);

  

  return (
    <ScrollView style={styles.container}>
      <Header />
      {isLoading ? <ActivityIndicator size='large' color='grey' /> : (
        <View>
          <View style={[styles.sectionContainer, {marginTop: SIZE.height > 700 ? 15 : 0}]}>
            <Text style={styles.sectionTitle}>Most Popular Coins</Text>
            <FlatList 
              data={data.slice(0, 20)}
              renderItem={renderItem}
              horizontal={true}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Top Gainers</Text>
            <FlatList 
              data={topDailyData.slice(0, 20)}
              renderItem={renderItem}
              horizontal={true}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Biggest Losers</Text>
            <FlatList 
              data={lossDailyData.slice(0, 20)}
              renderItem={renderItem}
              horizontal={true}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263238',
  },
  image: {
    height: 21, 
    width: 21, 
    marginRight: 4
  },
  imageContainer: {
    flexDirection: 'row', 
    marginRight: 5
  },
  horizontalFlatListTitle: {
    color: 'white',
    fontFamily: 'serif',
    fontSize: 13,
    fontWeight: 'bold',
    paddingBottom: 5
  },
  horizontalFlatListContainer: {
    borderWidth: 0.6,
    borderColor: '#c7c7c7',
    backgroundColor: '#4f5b62',
    borderRadius: 15,
    height: 133,
    margin: 9,
    overflow: 'hidden',
    padding: 12,
    width: 133
  },
  horizontalFlatListText: {
    color: 'white',
    fontFamily: 'serif',
    fontSize: 16,
    paddingTop: 10
  },
  sectionContainer: {
    height: SIZE.height / 3.5
  },
  sectionTitle: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10
  },
});

export default Home;