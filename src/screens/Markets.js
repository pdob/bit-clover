import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  RefreshControl,
  StyleSheet,
  FlatList,
} from 'react-native';
import CoinFlatListItem from '../components/CoinFlatlistItem';
import Error from '../components/Error';
import Loading from '../components/Loading';
import {makeRequest} from '../api';
import {SettingsContext} from '../contexts/SettingsContext';
import {SearchBar} from 'react-native-elements';

const Markets = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const marketCapDesc = initialData
    .slice()
    .sort((a, b) => a.market_cap_rank - b.market_cap_rank);
  const marketCapAsc = initialData
    .slice()
    .sort((a, b) => b.market_cap_rank - a.market_cap_rank);
  const priceAsc = initialData
    .slice()
    .sort((a, b) => a.current_price - b.current_price);
  const priceDesc = initialData
    .slice()
    .sort((a, b) => b.current_price - a.current_price);
  const percent24Asc = initialData
    .slice()
    .sort(
      (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h,
    );
  const percent24Desc = initialData
    .slice()
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h,
    );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Market High');
  const [error, setError] = useState(null);
  const listRef = useRef(null);
  const {currency} = useContext(SettingsContext);

  const getData = async () => {
    try {
      makeRequest({
        path: `/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=${pageNumber}&sparkline=false&price_change_percentage=24h`,
      })
        .then(response => response.json())
        .then(json => {
          setData(json);
          setInitialData(json);
          setError(false);
        });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [refreshing, pageNumber]);

  const searchFilter = text => {
    const newData = data.filter(item => {
      const itemData = item.name.toLowerCase();
      const symbolData = item.symbol.toLowerCase();
      const textData = text.toLowerCase();
      return (
        itemData.indexOf(textData) >= 0 || symbolData.indexOf(textData) >= 0
      );
    });
    setData(newData);
    setSearchTerm(text);

    if (!text) {
      setData(initialData);
      setSearchTerm(text);
    }
  };

  const renderItem = useCallback(
    ({item}) => (
      <CoinFlatListItem
        id={item.id}
        image={item.image}
        name={item.name}
        price={item.current_price}
        rank={item.market_cap_rank}
        percentage={item.price_change_percentage_24h}
        symbol={item.symbol}
      />
    ),
    [],
  );

  const PageButton = ({pageNo}) => {
    return (
      <Pressable
        onPress={() => {
          setPageNumber(pageNo);
          listRef.current.scrollToOffset({offset: 0, animated: true});
        }}>
        <View style={styles.pageButton}>
          <Text
            style={[
              styles.pageButtonText,
              {color: pageNo === pageNumber ? 'white' : 'grey'},
            ]}>
            {pageNo}
          </Text>
        </View>
      </Pressable>
    );
  };

  const Header = () => (
    <View style={styles.header}>
      <Pressable
        style={styles.headerName}
        onPress={() => {
          sortBy === 'Market High'
            ? setData(marketCapAsc)
            : setData(marketCapDesc);
          sortBy === 'Market High'
            ? setSortBy('Market Low')
            : setSortBy('Market High');
        }}>
        <Text style={styles.headerText}>Name</Text>
      </Pressable>
      <Pressable
        style={styles.headerHours}
        onPress={() => {
          sortBy === 'Percent High'
            ? setData(percent24Asc)
            : setData(percent24Desc);
          sortBy === 'Percent High'
            ? setSortBy('Percent Low')
            : setSortBy('Percent High');
        }}>
        <Text style={styles.headerText}>24h</Text>
      </Pressable>
      <Pressable
        style={styles.headerPrice}
        onPress={() => {
          sortBy === 'Price High' ? setData(priceAsc) : setData(priceDesc);
          sortBy === 'Price High'
            ? setSortBy('Price Low')
            : setSortBy('Price High');
        }}>
        <Text style={styles.headerText}>Price</Text>
      </Pressable>
    </View>
  );

  const Footer = () => {
    const myPages = [];
    for (let i = 1; i < 6; i++) {
      myPages.push(<PageButton key={i} pageNo={i} />);
    }
    return <View style={styles.footer}>{myPages}</View>;
  };

  const Separator = () => <View style={styles.separator} />;

  const Empty = () => (
    <Text style={styles.headerText}>
      Unfortunately, we cannot find the asset that you are looking for.
    </Text>
  );

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && !error ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          {!error && !loading && (
            <View style={styles.flex1}>
              <SearchBar
                onChangeText={searchFilter}
                placeholder="Search coins"
                placeholderTextColor="white"
                value={searchTerm}
                containerStyle={styles.inputContainer}
              />
              <FlatList
                extraData={searchTerm}
                contentContainerStyle={{flexGrow: 1}}
                ref={listRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={Separator}
                ListHeaderComponent={Header}
                ListFooterComponent={Footer}
                ListFooterComponentStyle={{marginTop: 'auto'}}
                ListEmptyComponent={Empty}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            </View>
          )}
          {error && <Error />}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  flex1: {
    flex: 1,
  },
  searchBox: {
    height: 40,
    backgroundColor: '#102027',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    height: 40,
    backgroundColor: '#102027',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerHours: {
    width: '30%',
    alignItems: 'center',
  },
  headerName: {
    width: '40%',
    alignItems: 'center',
    paddingLeft: 7,
  },
  headerPrice: {
    width: '30%',
    alignItems: 'center',
  },
  headerText: {
    color: '#b6bab8',
    fontSize: 15,
    fontWeight: '700',
  },
  footer: {
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    height: 35,
    alignItems: 'center',
  },
  pageButton: {
    padding: 10,
  },
  pageButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    height: 0.6,
    width: '100%',
    backgroundColor: 'grey',
  },
  inputContainer: {
    backgroundColor: '#102027',
  },
});

export default Markets;
