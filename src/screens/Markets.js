import React, {
  useCallback,
  useContext, 
  useEffect,
  useState 
} from 'react';
import { 
  ActivityIndicator, 
  Image, 
  FlatList, 
  Modal, 
  Pressable, 
  RefreshControl,
  SafeAreaView, 
  Text,
  TextInput, 
  View 
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from '../config/styles';
import { useNavigation } from '@react-navigation/core';
import numbro from 'numbro';
import { SettingsContext } from '../contexts/SettingsContext';


const Markets = () => {
  
  {/** Import variables from settings context */}
  const { currency, currencySymbol, SIZE } = useContext(SettingsContext);
  const endpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d`;
  const [data, setData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  {/** Sort data based on to display sorted data*/}
  const marketCapDesc = masterData.slice().sort((a, b) => a.rank - b.rank);
  const marketCapAsc = masterData.slice().sort((a, b) => b.rank - a.rank);
  const priceAsc = masterData.slice().sort((a, b) => a.price - b.price);
  const priceDesc = masterData.slice().sort((a, b) => b.price - a.price);
  const percent24Asc = masterData.slice().sort((a, b) => a.percentage24h - b.percentage24h);
  const percent24Desc = masterData.slice().sort((a, b) => b.percentage24h - a.percentage24h);
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [percentage, setPercentage] = useState(24);
  const [sortBy, setSortBy] = useState('Market Cap High');
  const [searchQuery, setSearchQuery] = useState('');

  {/** Map data to filter out unnecessary data from API to improve performance */}

  const getData = async () => {
    try {
      const response = await fetch(endpoint)
      const json = await response.json();
      setData(json.map(item => ({
        currencySymbol: currencySymbol,
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
      setMasterData(json.map(item => ({
        currencySymbol: currencySymbol,
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
  }, [refreshing, endpoint]);

  {/** Reusable component for percentage buttons*/}

  const PercentButton = ({ percent, label, onPress }) => (
    <Pressable 
      style={{
        backgroundColor: percentage === percent ? 'grey' : '#263238', 
        borderRadius: 10,
        padding: 10 
      }}
      onPress={onPress}
    >
      <Text style={styles.marketHeaderButtonText}>{label}</Text>
    </Pressable>
  );

  {/** Reusable component for sorting buttons */}

  const SortButton = ({sortVal, onPress }) => (
    <Pressable 
      style={{
        backgroundColor: sortBy === sortVal ? 'grey' : '#263238',
        borderRadius: 15, 
        height: 45, 
        justifyContent: 'center',
        padding: 10 
      }}
      onPress={onPress}
    >
      <Text style={styles.marketHeaderButtonText}>{sortVal}</Text>
    </Pressable>
  );

  {/** Method to filter data for the search functionality */}

  const searchFilter = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      setSearchQuery(text);
    } else {
      setData(masterData);
      setSearchQuery(text);
    }
  }

  {/** Functions required for refresh control */}

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  {/** Component which houses buttons for sorting and changing flatlist data being displayed */}

  const MarketHeader = () => {
    const [percentageVisible, setPercentageVisible] = useState(false);
    const [sortByVisible, setSortByVisible] = useState(false);

    return (
      <View style={styles.marketHeaderBar}>
        <Pressable style={styles.marketHeaderButtons} onPress={() => setSortByVisible(!sortByVisible)}>
          <Text style={styles.marketHeaderButtonText}>Sort by</Text>
        </Pressable>
        <Pressable style={styles.marketHeaderButtons} onPress={() => setPercentageVisible(!percentageVisible)}>
          <Text style={styles.marketHeaderButtonText}>% Change</Text>
        </Pressable>

        <Modal
          animationType='fade'
          transparent={true}
          visible={percentageVisible}
          onRequestClose={() => setPercentageVisible(false)}
        >
          <View style={styles.marketPercentMenu}>
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
          <View style={styles.marketSortMenu}>
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

  {/** Flatlist item component, utilising react memo to improve performance */}

  const Item = React.memo(({ name, rank, symbol, percentage1h, percentage24h, percentage7d, percentage14d, percentage30d, price, image, sparkline, id, currencySymbol }) => {

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
        {/** Pressable component which will pass parameters to the 'Display Coin Info' page */}
        <Pressable 
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
          onPress={() => {
              navigation.navigate('CoinInfo', {
              name,
              image,
              id,
              price
            })
          }
        }>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image 
                style={{height: 20, width: 20}}
                source={{uri: image}}
            />
            <Text style={styles.flatlistText}>
              {rank} {name}{'\n'}
              <Text style={{color: '#b6bab8', fontWeight: 'bold', fontSize: 12}}>{symbol.toUpperCase()}{'\n'}</Text>
              {currencySymbol}        
              {numbro(price).format({ thousandSeparated: true, mantissa: 2})}
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
          <View 
            style={{
              paddingRight: 15, 
              justifyContent: 'center'
            }}
          >
            <Text 
              style={{
                color: percentageShown > 0 ? 'green' : 'red',
                fontFamily: 'serif',
                fontSize: 13
              }}
            >
              {percentageShown > 0 ? '+' : ''}{percentageShown.toFixed(2)}%
            </Text>
          </View>
        </Pressable>
      </View>
    )});
  
  {/** Render item method using useCallback hook, which will only re-render if value of percentage changes*/}

  const renderItem = useCallback(({ item }) => {

    return (
      <Item 
        id={item.id}
        currencySymbol={item.currencySymbol}
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
  )}, [percentage]);

  {/** Method to get flatlist item layout to improve flatlist performance */}

  const getItemLayout = (data, index) => {
    return {
      length: 75,
      offset: 75 * index, 
      index
    }
  }

  {/** Separator and List empty components */}

  const Separator = () => (
    <View 
      style={{
        height: 0.4, 
        color: 'grey'
      }}
    />
  
  )

  const Empty = () => (
    <View 
      style={{
        backgroundColor: 'black',
        height: SIZE.height, 
        paddingTop: 20
      }}
    >
      <Text style={styles.flatlistText}>Sorry, we cannot find the item you searched for</Text>
    </View>
  )

  return (  
    <SafeAreaView style={styles.flatlistContainer}> 
      {isLoading ? <ActivityIndicator color='grey' size='large'/> : ( 
        <View>
          <MarketHeader />
          <FlatList
            contentContainerStyle={{paddingBottom: 25}}
            data={data}
            getItemLayout={getItemLayout}
            initialNumToRender={10}
            ItemSeparatorComponent={Separator}
            keyExtractor={item => item.id}
            ListEmptyComponent={Empty}
            renderItem={renderItem}
            removeClippedSubviews={true}
            windowSize={15}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
          <TextInput 
            onChangeText={(text) => searchFilter(text)}
            placeholder='Search coins'
            placeholderTextColor='white'
            style={styles.marketTextInput}
            value={searchQuery}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Markets;