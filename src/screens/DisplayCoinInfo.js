import React, { useState, useEffect } from 'react';
import { 
  ActivityIndicator, 
  Dimensions, 
  Pressable,
  SafeAreaView, 
  ScrollView, 
  Text, 
  View
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
  const chart1Endpoint = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&interval=hourly`;
  const chart7Endpoint = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=hourly`;
  const chart14Endpoint = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=14&interval=hourly`;
  const chart30Endpoint = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=hourly`;
  const [coinData, setCoinData] = useState({});
  const [chartData1, setChartData1] = useState([]);
  const [chartData7, setChartData7] = useState([]);
  const [chartData14, setChartData14] = useState([]);
  const [chartData30, setChartData30] = useState([]);
  const [isLoading, setLoading] = useState(true);  

  {/* Function which gets required data sets from the CoinGecko API */}

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
      const timeTaken = (new Date() - time);
      console.log(timeTaken);
      setLoading(false);
    })
  }

  useEffect(() => {
    getData();
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
      if(chartPrices !== undefined) {
      let minValue = Math.min(...chartPrices);
      let maxValue = Math.max(...chartPrices);
      let midValue = (minValue + maxValue) / 2;
      let lowerMidValue = (midValue + minValue) / 2;
      let higherMidValue = (midValue + maxValue) / 2;

      return [
        numbro(maxValue).formatCurrency({ thousandSeparated: true, mantissa: 2 }),
        numbro(higherMidValue).formatCurrency({ thousandSeparated: true, mantissa: 2 }),
        numbro(midValue).formatCurrency({thousandSeparated: true, mantissa: 2 }),
        numbro(lowerMidValue).formatCurrency({ thousandSeparated: true, mantissa: 2 }),
        numbro(minValue).formatCurrency({ thousandSeparated: true, mantissa: 2 })
      ];
      } else {
        return [];
      }
    };

    {/* Functions required to properly format prices and dates in the chart */}
    const points = monotoneCubicInterpolation({ data: dataToShow, range: 400 });   

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

    {/* Component for creating buttons for the chart */}

    const ChartButtons = ({ label }) => {
      return (
        <Pressable onPress={() => setDays(label)}>
          <View style={{
            backgroundColor: label === days ? 'grey' : 'transparent',
            borderRadius: 10,
            padding: 10,
            opacity: 0.8
          }}>
            <Text style={{color: 'white'}}>{label}D</Text>
          </View>
        </Pressable>
      );
    }

    {/* Get high and low amount + date */}

    const ShowHighLow = () => {
      const values = useChartData();
      if (values.greatestY !== undefined || values.smallestY !== undefined ) {
        return ( 
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
            <Text style={infoStyles.statsText}>
              Lowest price: {'\n'}{numbro(values.smallestY.y).formatCurrency( {thousandSeparated: true, mantissa: 2})} {'\n'}
              {moment.unix(values.smallestY.x).format(`MMMM Do YYYY` )} 
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
          <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingRight: 10
          }}>
            {LABELS.map((item, index) => {
              return (
                <ChartButtons 
                  key={index}
                  label={item}
                />
              )
            })}
          </View>  
          <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            paddingLeft: 10,
            paddingTop: 10,
            color: 'white'
          }}
          >
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
            <Text style={infoStyles.coinPrice}>{price} USD</Text>
            <Text style={{color: coinData.price_change_24h_in_currency.usd > 0 ? 'green' : 'red'}}>
              {coinData.price_change_24h_in_currency.usd > 0 ? '+' : ''}
              {coinData.price_change_24h_in_currency.usd.toFixed(3)} USD ({coinData.price_change_percentage_24h.toFixed(3)}%)(last 24h)
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
                {numbro(coinData.market_cap.usd).formatCurrency({average: true, mantissa: 3})}  {'\n'}
                {numbro(coinData.circulating_supply).format({average: true, mantissa: 3})} {'\n'}
                {coinData.total_supply ? numbro(coinData.total_supply).format({average: true, mantissa: 3}) : 'n/a'} {'\n'}
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
