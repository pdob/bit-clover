import React, { useState, useEffect, useContext } from 'react';
import { 
  ActivityIndicator, 
  Dimensions, 
  Image, 
  SafeAreaView, 
  Text, 
  ScrollView, 
  View, 
  Pressable
} from 'react-native';
import styles, { infoStyles } from '../config/styles';
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

const DisplayCoinInfo = ({ route }) => {

  const SIZE = Dimensions.get('window');
  const LABELS = [1, 7, 14, 30];

  const { name, image, id, price } = route.params;

  const [days, setDays] = useState(1);
  const endpoint = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`;
  const chartEndpoint = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=hourly`;
  const [coinData, setCoinData] = useState({});
  const [chartData, setChartData] = useState([]);
  const [isLoading, setLoading] = useState(true);  
  const [selected, setSelected] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(price);

  {/* Function which gets required data sets from the CoinGecko API */}

  const getData = async () => {
    try {
      const coinResponse = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      });
      const chartResponse = await fetch(chartEndpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      });

      const coin = await coinResponse.json();
      const chart = await chartResponse.json();
      setCoinData(coin.market_data);
      setChartData(chart.prices);

    }
    catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  getData();
  }, [days]);
  
  {/* Function which shows the chart for the currency for a selected period of time */}

  const ShowChart = () => {


    {/* Getting the date and required data to display in the chart */}
    const getDate = noOfDays => {
      return moment().subtract(noOfDays, 'days').unix();
    };
    
    const dataToShow = chartData.map((item, index) => {
      return {
        x: getDate(30) + index  * 3600,
        y: item[1]
      }
    });
    
    {/* Extracting prices from the Data array, then getting chart labels */}
    const chartPrices = dataToShow.map(item => item.y);
    
    const getLabelValues = () => {

        if(chartPrices !== undefined) {
        let minValue = Math.min(...chartPrices);
        let maxValue = Math.max(...chartPrices);
        let midValue = (minValue + maxValue) / 2;
        let lowerMidValue = (midValue + minValue) / 2;
        let higherMidValue = (midValue + maxValue) / 2;

        return [
          numbro(maxValue).formatCurrency( {thousandSeparated: true, mantissa: 2} ),
          numbro(higherMidValue).formatCurrency( {thousandSeparated: true, mantissa: 2} ),
          numbro(midValue).formatCurrency( {thousandSeparated: true, mantissa: 2} ),
          numbro(lowerMidValue).formatCurrency( {thousandSeparated: true, mantissa: 2} ),
          numbro(minValue).formatCurrency( {thousandSeparated: true, mantissa: 2} )
        ];
      } else {
        return [];
      }
    };

    {/* Functions required to properly format prices and dates in the chart */}

    const points = monotoneCubicInterpolation({ data: dataToShow, range: 800});   

    const formatCurrency = value => {
      'worklet';

      if (value === '') {
        return '';
      }

      return `$${Number(value).toFixed(2)}`;
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

    {/* Get high and low amount + date */}

    const ShowHighLow = () => {
      const values = useChartData();
      if (values.greatestY !== undefined || values.smallestY !== undefined) {
        return ( 
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
            <Text style={infoStyles.statsText}>
              Lowest price: {'\n'}{numbro(values.smallestY.y).formatCurrency( {thousandSeparated: true, mantissa: 2})} {'\n'}
              {moment.unix(values.smallestY.x).format('MMMM Do YYYY')} 
            </Text>   
            <Text style={infoStyles.statsText}>
              Highest price: {'\n'}{numbro(values.greatestY.y).formatCurrency( {thousandSeparated: true, mantissa: 2})} {'\n'}
              {moment.unix(values.greatestY.x).format('MMMM Do YYYY')} 
            </Text>          
          </View>
        );
      } else {
        return <Text></Text>
      }
    }
    
    {/* Rendering the actual chart and labels + graph styling configuration */}
    return (
      <SafeAreaView style={infoStyles.chart}>
        <ChartPathProvider data={{ points, smoothingStrategy: 'bezier'}}>
          <View style={{height: 260, position: 'absolute', justifyContent: 'space-between', top: 5, bottom: 0}}>
            {
              getLabelValues().map((item, index) => {
                return (
                  <Text 
                    key={index}
                    style={{
                      color: 'white'
                    }}
                  >{item}</Text>
                )
              })
            }
          </View>
          <ChartPath height={250} stroke='white' width={SIZE.width} strokeWidth={3} opacity={0.6}/>
          <ChartDot style={{ backgroundColor: 'white'}}/>
          <View style={styles.separator}/>
          <ChartYLabel 
            format={formatCurrency}
            style={infoStyles.chartAxisLabels}           
          />
          <ChartXLabel 
            format={formatDate}
            style={infoStyles.chartAxisLabels}
          />
          <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            paddingLeft: 10,

            color: 'white'
          }}>
            Last {days === 1 ? '24 hours' : `${days} days`} 
          </Text>
          <ShowHighLow />
        </ChartPathProvider>
      </SafeAreaView>
    )
  };
  

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
          <View style={infoStyles.coinTitleContainer}>
            <Text style={infoStyles.coinTitle}>{name} current price</Text>
            <Text style={infoStyles.coinPrice}>{currentPrice} USD</Text>
            <Text style={{color: coinData.price_change_24h_in_currency.usd > 0 ? 'green' : 'red'}}>
              {coinData.price_change_24h_in_currency.usd > 0 ? '+' : '-'}
              {coinData.price_change_24h_in_currency.usd.toFixed(3)} USD ({coinData.price_change_percentage_24h.toFixed(3)}%) (last 24h)
            </Text>  
          </View>

          {/* Chart component */}
          <ShowChart />

          {/* Section containing  detailed information about selected currency */}
          <View style={infoStyles.statsContainer}>
            <Text style={infoStyles.statsTitle}>About {name} </Text>
            <View style={infoStyles.stats}>
              <Text style={infoStyles.statsText}>
                Market rank: {'\n'}        
                Market cap: {'\n'}             
                Circulation supply: {'\n'}     
                Total supply: {'\n'}           
                All time high: {'\n'}               
              </Text>
              <Text style={infoStyles.statsText}>
                {coinData.market_cap_rank} {'\n'}
                {numbro(coinData.market_cap.usd).formatCurrency({average: true, totalLength: 5})}  {'\n'}
                {numbro(coinData.circulating_supply).format({average: true, totalLength: 2})} {'\n'}
                {coinData.total_supply ? numbro(coinData.total_supply).format({average: true, totalLength: 2}) : 'n/a'} {'\n'}
                {coinData.ath.usd} USD       
              </Text>
            </View>
          </View>
        </SafeAreaView>
      )}
    </ScrollView>
  );
};

export default DisplayCoinInfo;