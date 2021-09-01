import React, { useState, useEffect } from 'react';
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
  monotoneCubicInterpolation
} from '@rainbow-me/animated-charts';
import numbro from 'numbro';

const DisplayCoinInfo = ({ route }) => {

  const SIZE = Dimensions.get('window');
  const LABELS = [1, 7, 14, 30];

  const { name, image, id } = route.params;
  const [days, setDays] = useState(1);
  const endpoint = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`;
  const chartEndpoint = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
  const [coinData, setCoinData] = useState({});
  const [chartData, setChartData] = useState([]);
  const [isLoading, setLoading] = useState(true);  
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
  }, []);
  
  const ShowChart = () => {

    const dataToShow = chartData.map((item, index) => {
      return {
        x: index,
        y: item[1]
      }
    });
    const points = monotoneCubicInterpolation({ data: dataToShow, range: dataToShow.length});

    const format = value => {
      'worklet';

      if (value === '') {
        return '';
      }

      return `$${Number(value).toFixed(2)}`
    };   

    return (
      <View style={infoStyles.chart}>
        <ChartPathProvider data={{ points, smoothingStrategy: 'bezier'}}>
          <ChartPath height={250} stroke='white' width={SIZE.width} strokeWidth={3} />
          <ChartDot style={{ backgroundColor: 'grey'}}/>
          <ChartYLabel 
            format={format}
            style={{
              color: 'white',
              fontSize: 20,
            }}
          />
        </ChartPathProvider>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          {LABELS.map((label, index) => {
            return (
              <Pressable key={index} onPress={() => setDays(label)}>
                <Text style={{color: 'white'}}>{label}D</Text>
              </Pressable>
            )
          })}
        </View>
      </View>
    )
  };


  return (
    <ScrollView style={styles.container}>
      {isLoading ? <ActivityIndicator size='large' color='grey' /> : (
        <SafeAreaView style={styles.container}>
          <CoinHeader
            name={name}
            image={image}
          />

          <View style={infoStyles.coinTitleContainer}>
            <Text style={infoStyles.coinTitle}>{name} price</Text>
            <Text style={infoStyles.coinPrice}>{coinData.current_price.usd} USD</Text>
            <Text style={{color: coinData.price_change_24h_in_currency.usd > 0 ? 'green' : 'red'}}>
              {coinData.price_change_24h_in_currency.usd > 0 ? '+' : '-'}
              {coinData.price_change_24h_in_currency.usd.toFixed(3)} USD ({coinData.price_change_percentage_24h.toFixed(3)}%)
            </Text>  
          </View>
          <ShowChart />
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
                {numbro(coinData.market_cap.usd).format({average: true, totalLength: 5})}  {'\n'}
                {numbro(coinData.circulating_supply).format({average: true, totalLength: 2})} {'\n'}
                {coinData.total_supply ? numbro(coinData.total_supply).format({average: true, totalLength: 2}) : 'n/a'} {'\n'}
                {coinData.ath.usd}       
              </Text>
            </View>
          </View>
        </SafeAreaView>
      )}
    </ScrollView>
  );
};

export default DisplayCoinInfo;