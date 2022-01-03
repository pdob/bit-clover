import React, { 
  useState, 
  useEffect, 
  useContext, 
  useCallback 
} from 'react';
import { 
  ActivityIndicator, 
  Dimensions, 
  Image,
  Pressable,
  SafeAreaView, 
  ScrollView, 
  StyleSheet,
  Text, 
  View
} from 'react-native';
import CoinHeader from '../components/CoinHeader';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
  useChartData
} from '@rainbow-me/animated-charts';
import moment from 'moment';
import numbro from 'numbro';
import { SettingsContext } from '../contexts/SettingsContext';
import icons from '../constants/icons';

const DisplayCoinInfo = ({ route }) => {

  const SIZE = Dimensions.get('window');
  const LABELS = [1, 7, 14, 30];
  const { currency, currencySymbol } = useContext(SettingsContext);
  const { name, image, id, price } = route.params;

  const [days, setDays] = useState(1);
  const endpoint = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`;
  const chart1Endpoint = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=1&interval=hourly`;
  const chart7Endpoint = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=7&interval=hourly`;
  const chart14Endpoint = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=14&interval=hourly`;
  const chart30Endpoint = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=30&interval=hourly`;
  const [coinData, setCoinData] = useState({});
  const [chartData1, setChartData1] = useState([]);
  const [chartData7, setChartData7] = useState([]);
  const [chartData14, setChartData14] = useState([]);
  const [chartData30, setChartData30] = useState([]);
  const [isLoading, setLoading] = useState(true);  

  {/* Function which gets required data sets from the CoinGecko API */}

  const controller = new AbortController();

  const getData = () => {

    const time = new Date();
    Promise.all([
      fetch(endpoint),
      fetch(chart1Endpoint),
      fetch(chart7Endpoint), 
      fetch(chart14Endpoint), 
      fetch(chart30Endpoint)
    ])
    .then(async([res1, res2, res3, res4, res5]) => {
      const a = await res1.json();
      const b = await res2.json();
      const c = await res3.json();
      const d = await res4.json();
      const e = await res5.json();
      setCoinData(a.market_data);
      setChartData1(b.prices);
      setChartData7(c.prices);
      setChartData14(d.prices);
      setChartData30(e.prices);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    getData();
    
    return () => {
      controller.abort();
    }
  }, []);
  


  {/* Function which shows the chart for the currency for a selected period of time */}
  const ShowChart = () => {

    {/* Getting the date and required data to display in the chart */}
    const getDate = noOfDays => {
      return moment().subtract(noOfDays, 'days').unix();
    };
    
    let chartData = [];

    switch(days) {
      case 1:
        chartData = chartData1;
        break;
      case 7:
        chartData = chartData7;
        break;
      case 14:
        chartData = chartData14;
        break;
      case 30:
        chartData = chartData30;
        break;
    }

    const dataToShow = chartData.map((item, index) => {
      return {
        x: getDate(days) + index  * 3600,
        y: item[1]
      }
    });

    {/* Extracting prices from the Data array, then getting chart labels */}
    
    
    const getLabelValues = () => {
      const chartPrices = dataToShow.map(item => item.y);
      if (chartPrices) {
        let minValue = Math.min(...chartPrices);
        let maxValue = Math.max(...chartPrices);
        let midValue = (minValue + maxValue) / 2;
        let lowerMidValue = (midValue + minValue) / 2;
        let higherMidValue = (midValue + maxValue) / 2;

        return [
          numbro(maxValue).formatCurrency({ thousandSeparated: true, mantissa: maxValue > 1 ? 2 : 4, currencySymbol: currencySymbol }),
          numbro(higherMidValue).formatCurrency({ thousandSeparated: true, mantissa: higherMidValue > 1 ? 2 : 4, currencySymbol: currencySymbol }),
          numbro(midValue).formatCurrency({thousandSeparated: true, mantissa: midValue > 1 ? 2 : 4, currencySymbol: currencySymbol }),
          numbro(lowerMidValue).formatCurrency({ thousandSeparated: true, mantissa: lowerMidValue > 1 ? 2 : 4, currencySymbol: currencySymbol }),
          numbro(minValue).formatCurrency({ thousandSeparated: true, mantissa: minValue > 1 ? 2 : 4, currencySymbol: currencySymbol })
        ];
      } else {
        return [];
      }
    };

    {/* Functions required to properly format prices and dates in the chart */}
    const points = monotoneCubicInterpolation({ data: dataToShow, range: 250 });   

    const formatCurrency = value => {
      'worklet';

      if (value === '') {
        return '';
      }

      return `${currency === 'USD' ? '$' : currencySymbol}${Number(value).toFixed(value > 1 ? 2 : 4)}`;
    };   

    const formatDate = value => {
      'worklet';
    
      if (value === '') {
        return '';
      }

      const date = new Date(Number(value * 1000));
      const h = date.getHours();
      const d = date.getDate();
      const m = date.getMonth() + 1;
      const y = date.getFullYear(); 

      return `${d}-${m}-${y}, ${h}:00`;
    };

    {/* Component for creating buttons for the chart */}

    const ChartButtons = ({ label }) => {
      return (
        <Pressable onPress={() => setDays(label)}>
          <View style={{ padding: 15 }}>
            <Text 
              style={{
                color: label === days ? 'white' : 'grey', 
                fontWeight: 'bold', 
                fontSize: 16.5, 
                fontFamily: 'sans-serif'
              }}
            >
              {label}D
            </Text>
          </View>
        </Pressable>
      );
    }

    {/* Get high and low amount + date */}

    const ShowHighLow = useCallback(() => {
      const values = useChartData();
      if (values?.greatestY || values?.smallestY) {
        return ( 
          <View>
            <Text style={styles.coinDateInfoLabel}>
              Last {days === 1 ? '24 hours' : `${days} days`} 
            </Text>
            <View style={styles.chartCoinInfo}>
              <Text style={styles.statsText}>
                Lowest price: {'\n'}{numbro(values.smallestY.y).formatCurrency({
                    thousandSeparated: true, 
                    mantissa: values.smallestY.y > 1 ? 2 : 4, 
                    currencySymbol: currencySymbol
                  })
                } {'\n'}
                <Text style={styles.flatlistSubheading}>
                  {days === 1 ? moment.unix(values.smallestY.x).fromNow() : moment.unix(values.smallestY.x).format(`MMMM Do YYYY`)} 
                </Text>
              </Text>   
              <Text style={styles.statsText}>
                Highest price: {'\n'}{numbro(values.greatestY.y).formatCurrency({
                    thousandSeparated: true, 
                    mantissa: values.greatestY.y > 1 ? 2 : 4, 
                    currencySymbol: currencySymbol
                  })
                } {'\n'}
                <Text style={styles.flatlistSubheading}>
                  {days === 1 ? moment.unix(values.greatestY.x).fromNow() : moment.unix(values.greatestY.x).format(`MMMM Do YYYY`)} 
                </Text>
              </Text>          
            </View>
          </View>
        );
      } else {
        return <View style={styles.chartCoinInfo}/>
      }
    }, []);
    
    {/* Rendering the actual chart and labels + graph styling configuration */}
    return (
      <SafeAreaView style={styles.chart}>
        <ChartPathProvider data={{ points, smoothingStrategy: 'bezier'}}>
          <View style={styles.chartLabels}>
            {
              getLabelValues().map((item, index) => {
                return (
                  <Text 
                    key={index}
                    style={styles.statsText}
                  >
                    {item}
                  </Text>
                )
              })
            }
          </View>
          <ChartPath height={250} stroke='white' width={SIZE.width} strokeWidth={3} opacity={0.6}/>
          <ChartDot style={{ backgroundColor: 'white'}}/>
          <View style={styles.separator}/>
          <ChartYLabel 
            format={formatCurrency}
            style={styles.chartAxisLabels}           
          />
          <ChartXLabel 
            format={formatDate}
            style={styles.chartAxisLabels} 
          />
          <View style={styles.chartButtonContainer} >
            {LABELS.map((item, index) => {
              return (
                <ChartButtons 
                  key={index}
                  label={item}
                />
              )
            })}
          </View>  
          <View style={styles.showHighLow}>
            <ShowHighLow />
          </View>
        </ChartPathProvider>
      </SafeAreaView>
    )
  };

  {/** Reusable component to display coin stats */}

  const CoinStat = ({ icon, title, value }) => (
    <View style={styles.coinStat}>
      <View style={{flexDirection: 'row'}}>
        <Image source={icon} style={{height: 20, width: 20, marginRight: 10}}/>
        <Text style={styles.statsText}>{title}</Text>
      </View>
      <Text style={styles.statsText}>{value}</Text>
    </View>
  );

  const StatContainer = () => (
    <View style={styles.statContainer} >
      <CoinStat icon={icons.marketRank} title='Market rank' value={coinData.market_cap_rank}/>
      <CoinStat icon={icons.marketCap} title='Market cap'
        value={numbro(coinData.market_cap[currency.toLowerCase()]).formatCurrency({
          average: true, 
          mantissa: 3, 
          currencySymbol: currencySymbol})}
      />
      <CoinStat icon={icons.circulationSupply} title='Circulating supply'
        value={numbro(coinData.circulating_supply).format({average: true, mantissa: 2})}
      />
      <CoinStat icon={icons.totalSupply} title='Total supply' 
        value={coinData.total_supply ? numbro(coinData.total_supply).format({average: true, mantissa: 2}) : 'n/a'}
      />
      <CoinStat icon={icons.ath} title='All time high' 
        value={`${coinData.ath[currency.toLowerCase()].toFixed(2)} ${currency}`}
      />
      <CoinStat icon={icons.athDate} title='ATH date'
        value={moment(coinData.ath_date[currency.toLowerCase()]).format('LL')}
      />          
    </View>
  );

  {/** Function required to override default Numbro.js abbreviations */}
  numbro.registerLanguage(
    {
      ...require('numbro/languages/en-GB'),
      abbreviations: {
        thousand: '',
        million: ' million',
        billion: ' billion',
        trillion: ' trillion'
      },
    },
    true
  );

  return (
    <ScrollView style={styles.container}>
      {/* Display activity indicator if not loaded + show header based on received params */}
      {isLoading ? <ActivityIndicator size='large' color='grey' /> : (
        <SafeAreaView style={styles.container}>
          <CoinHeader
            name={name}
            image={image}
          />

          {/* Display basic information about selected currency */}
          <View style={styles.coinTitleContainer}>
            <Text style={styles.coinTitle}>{name} current price</Text>
            <Text style={styles.coinPrice}>{price.toFixed(2)} {currency}</Text>
            <Text style={{color: coinData.price_change_24h_in_currency.usd > 0 ? 'green' : 'red', fontSize: 15, fontFamily: 'sans-serif'}}>
              {coinData.price_change_24h_in_currency.usd > 0 ? '+' : ''}
              {coinData.price_change_24h_in_currency[currency.toLowerCase()].toFixed(3)} {currency} ({coinData.price_change_percentage_24h.toFixed(3)}%)
            </Text>  
          </View>

          {/* Chart component */}
          <ShowChart />

          {/* Section containing  detailed information about selected currency */}
          <View style={styles.statsSectionContainer}>
            <Text style={styles.statsTitle}>About {name} </Text>
            <StatContainer />     
          </View>
        </SafeAreaView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263238',
  },
  chart: {
    backgroundColor: 'black',
    justifyContent: 'center'    
  },
  chartAxisLabels: {
    color: 'white',
    fontFamily: 'serif',
    fontSize: 20,
    textAlign: 'center'
  },
  chartButtonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  chartCoinInfo: {
    alignContent: 'center',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingLeft: 10, 
    paddingRight: 10
  }, 
  chartLabels: {
    height: 260, 
    position: 'absolute', 
    justifyContent: 'space-between', 
    top: 5, 
    bottom: 0
  }, 
  coinDateInfoLabel: {
    fontFamily: 'serif',
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: 'white'
  },
  coinStat: {
    alignItems: 'center',
    backgroundColor: '#263238', 
    flexDirection: 'row', 
    height: 50, 
    justifyContent: 'space-between'
  }, 
  coinTitle: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 20
  },
  coinTitleContainer: {
    padding: 10
  },  
  coinPrice: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 35
  },
  flatlistSubheading: {
    color: '#b6bab8', 
    fontFamily: 'serif',
    fontSize: 13,
    fontWeight: 'bold' 
  },  
  header: {
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'row',
    height: 50,
  },
  headerBack: {
    height: 30,
    marginLeft: 5,
    marginRight: 10,
    width: 30
  },
  headerLogo: {
    height: 30,
    marginRight: 8,
    width: 30
  },
  headerTitle: {
    color: 'white',
    fontSize: 20
  },
  separator: {
    backgroundColor: '#1b1b1c',
    height: 0.7,
    width: '100%'
  },
  showHighLow: {
    justifyContent: 'center',
    borderColor: '#c7c7c7',
    borderRadius: 15,
    borderWidth: 0.6,
    backgroundColor: '#263238', 
    height: 120,
    marginLeft: 10, 
    marginRight: 10
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statContainer: {
    backgroundColor: '#263238',
    borderColor: '#c7c7c7',
    borderRadius: 15, 
    borderWidth: 0.6,
    justifyContent: 'center', 
    padding: 10
  },  
  statsSectionContainer: {
    backgroundColor: 'black',
    padding: 10,
  },
  statsText: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 18
  },  
  statsTitle: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 15
  }, 

});


export default DisplayCoinInfo;
