import React, { 
  useCallback,
  useContext,
  useEffect,
  useState 
} from 'react';
import { 
  Dimensions,
  FlatList, 
  Image, 
  Pressable, 
  ScrollView,
  StyleSheet, 
  View, 
  Text 
} from 'react-native';
import Header from '../components/AppHeader';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { useNavigation } from '@react-navigation/core';
import {LinearGradient} from 'expo-linear-gradient';
import { SettingsContext } from '../contexts/SettingsContext';
import { makeRequest } from '../api';
const SIZE = Dimensions.get('window');

const Home = () => {
   
  const { currency } = useContext(SettingsContext); 
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  
  {/** Sort data based on gains and losses */}
  const topDailyData = data.slice().sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  const lossDailyData = data.slice().sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
 
  {/* Function to get data from API, re-render if user changes currency in settings */}

  const getData = async () => {
    try {
      makeRequest({
        path: `/markets?vs_currency=${currency}&order=market_cap_desc&per_page=200&page=1&sparkline=false&price_change_percentage=24h`
      })
        .then(response => response.json())
        .then(json => setData(json));
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [currency]);

  
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
    <LinearGradient 
      colors={['#102027','#374851']}
      style={styles.container}
    >
      {loading && !error ? ( 
        <Loading />
      ) : (
        <ScrollView>
          <Header />
        
            <View>
              {!loading && !error && (
              <View>
                <View style={[styles.sectionContainer, {marginTop: SIZE.height > 700 ? 15 : 0}]}>
                  <Text style={styles.sectionTitle}>Most Popular Coins</Text>
                  <FlatList 
                    data={data.slice(0, 20)}
                    renderItem={renderItem}
                    horizontal
                  />
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Top Gainers</Text>
                  <FlatList 
                    data={topDailyData.slice(0, 20)}
                    renderItem={renderItem}
                    horizontal
                  />
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Biggest Losers</Text>
                  <FlatList 
                    data={lossDailyData.slice(0, 20)}
                    renderItem={renderItem}
                    horizontal
                  />
                </View>
              </View>
              )}
              {error && <Error />}
            </View>
          
        </ScrollView>
      )}
    </LinearGradient>
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
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 3,
    flex: 1
  },
  horizontalFlatListContainer: {
    backgroundColor: '#495f6b',
    borderRadius: 15,
    height: 130,
    margin: 9,
    overflow: 'hidden',
    padding: 10,
    width: 130,
    elevation: 15,
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
    fontSize: 23,
    fontStyle: 'italic',
    fontWeight: 'bold',
    padding: 10
  },
});

export default Home;