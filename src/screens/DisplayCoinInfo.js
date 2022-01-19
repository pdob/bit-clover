import React, {useEffect, useState, useCallback, useContext} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import DisplayInfoHeader from '../components/DisplayInfoHeader';
import ShowPriceInfo from '../components/ShowPriceInfo';
import icons from '../constants/icons';
import Loading from '../components/Loading';
import Error from '../components/Error';
import {SettingsContext} from '../contexts/SettingsContext';
import {makeRequest} from '../api';
import {LineChart} from 'react-native-wagmi-charts';
import millify from 'millify';

const DisplayCoinInfo = ({route}) => {
  const {id, name, image} = route.params;
  const [days, setDays] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [coinInfo, setCoinInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const labels = [1, 7, 30, 60, 365, 'max'];
  const controller = new AbortController();
  const {currency, currencySymbol} = useContext(SettingsContext);

  const getData = async () => {
    Promise.all([
      makeRequest({
        path: `/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
      }),
      makeRequest({
        path: `/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=${
          days === 1 || days === 7 || days == 30 ? 'hourly' : 'daily'
        }`,
      }),
    ])
      .then(async ([res1, res2]) => {
        const a = await res1.json();
        const b = await res2.json();
        setCoinInfo(a.market_data);
        setChartData(b.prices);
        setError(false);
      })
      .catch(error => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
    return () => {
      controller.abort();
    };
  }, [days]);

  const chartDataToShow = chartData?.map(item => {
    return {
      timestamp: item[0],
      value: item[1],
    };
  });

  const DisplayChart = () => {
    return (
      <LineChart.Provider data={chartDataToShow} style={styles.chartContainer}>
        <View style={styles.chartLabelContainer}>
          <LineChart.PriceText
            style={styles.chartPrice}
            format={({value}) => {
              'worklet';
              if (value) {
                return `${currencySymbol}${value}`;
              } else {
                return '';
              }
            }}
            precision={
              coinInfo.current_price[currency.toLowerCase()] < 0.05
                ? 10
                : coinInfo.current_price[currency.toLowerCase()] > 0.05 &&
                  coinInfo.current_price[currency.toLowerCase()] < 1
                ? 4
                : 2
            }
          />
          <LineChart.DatetimeText style={styles.chartDateTime} />
        </View>
        <LineChart>
          <LineChart.Path
            color={coinInfo.price_change_24h > 0 ? 'green' : 'red'}>
            <LineChart.Gradient />
          </LineChart.Path>
          <LineChart.CursorLine />
        </LineChart>
        <View style={styles.separator} />
      </LineChart.Provider>
    );
  };

  const DateButton = ({label}) => {
    return (
      <Pressable onPress={() => setDays(label)}>
        <View style={styles.dateButton}>
          <Text
            style={[
              styles.buttonText,
              {color: label === days ? 'white' : 'grey'},
            ]}>
            {label === 365 ? '1Y' : label}
            {typeof label === 'number' && label !== 365 && 'D'}
          </Text>
        </View>
      </Pressable>
    );
  };

  const ChartDateOptions = () => {
    return (
      <View style={styles.buttonContainer}>
        {labels.map((item, index) => (
          <DateButton key={index} label={item} />
        ))}
      </View>
    );
  };

  const CoinStat = ({icon, title, value}) => (
    <View style={styles.coinStat}>
      <View style={styles.coinStatContainer}>
        <Image source={icon} style={styles.coinStatImage} />
        <Text style={styles.coinStatText}>{title}</Text>
      </View>
      <Text style={styles.coinStatText}>{value}</Text>
    </View>
  );

  const formatCurrency = number => {
    if (number) {
      return millify(number, {
        precision: 2,
        units: ['', '', 'Million', 'Billion', 'Trillion', 'Quadrillion'],
        space: true,
      });
    }
  };

  const formatDate = date => {
    return new Date(date)?.toString().slice(0, 16);
  };

  const CoinInformation = useCallback(
    () => (
      <View>
        <View style={styles.statTitle}>
          <Text style={styles.coinStatTitle}>About {name}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.statContainer}>
          <CoinStat
            title="Market rank"
            value={coinInfo.market_cap_rank}
            icon={icons.marketRank}
          />
          <CoinStat
            title="Market cap"
            value={`${currencySymbol}${formatCurrency(
              coinInfo.market_cap[currency.toLowerCase()],
            )}`}
            icon={icons.marketCap}
          />
          <CoinStat
            title="Circulating supply"
            value={formatCurrency(coinInfo.circulating_supply)}
            icon={icons.circulatingSupply}
          />
          <CoinStat
            title="Total supply"
            value={formatCurrency(coinInfo.total_supply) || 'n/a'}
            icon={icons.totalSupply}
          />
          <CoinStat
            title="All time high"
            value={`${currencySymbol}${coinInfo.ath[
              currency.toLowerCase()
            ].toFixed(coinInfo.ath[currency.toLowerCase()] < 0.05 ? 7 : 2)}`}
            icon={icons.ath}
          />
          <CoinStat
            title="ATH date"
            value={formatDate(coinInfo.ath_date.aud)}
            icon={icons.athDate}
          />
        </View>
      </View>
    ),
    [coinInfo],
  );

  return (
    <ScrollView style={styles.container}>
      <DisplayInfoHeader name={name} image={image} />
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          {!loading && !error && (
            <View style={styles.container}>
              <ShowPriceInfo
                currency={currency}
                currencySymbol={currencySymbol}
                price={coinInfo.current_price[currency.toLowerCase()]}
                name={name}
                priceChange={
                  coinInfo.price_change_24h_in_currency[currency.toLowerCase()]
                }
                percentageChange={coinInfo.price_change_percentage_24h}
              />
              <DisplayChart />
              <ChartDateOptions />
              <View style={styles.separator} />
              <CoinInformation />
            </View>
          )}
          {error && <Error />}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  chartLabelContainer: {
    justifyContent: 'center',
    height: 50,
    paddingLeft: 10,
    alignItems: 'center',
  },
  chartDateTime: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  chartPrice: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  coinStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  coinStatContainer: {
    flexDirection: 'row',
  },
  coinStatImage: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  coinStatText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  coinStatTitle: {
    padding: 10,
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  dateButton: {
    padding: 20,
  },
  statContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  statTitle: {
    backgroundColor: '#102027',
  },
  separator: {
    backgroundColor: '#373737',
    height: 0.7,
    width: '100%',
  },
});

export default DisplayCoinInfo;
