import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Separator from '../components/Separator';
import Loading from '../components/Loading';
import * as WebBrowser from 'expo-web-browser';
import moment from 'moment';

const API_KEY = 'Enter your own free NewsAPI key';
const endpoint = `https://newsapi.org/v2/everything?q=crypto&language=en&apiKey=${API_KEY}`;
const SIZE = Dimensions.get('window');

const News = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch(endpoint);
      const json = await response.json();
      setData(
        json.articles.sort(
          (a, b) => moment(b.publishedAt).unix() - moment(a.publishedAt).unix(),
        ),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const Item = ({title, image, url, publishedAt}) => (
    <Pressable
      onPress={() => WebBrowser.openBrowserAsync(url)}
      style={styles.flatlistContainer}>
      <View style={styles.flatlistItem}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: image}} />
        </View>
        <View style={{flex: 0.8}}>
          <Text style={styles.flatlistText}>{title}</Text>
          <Text style={styles.dateTime}>{moment(publishedAt).fromNow()}</Text>
        </View>
      </View>
    </Pressable>
  );

  const renderItem = ({item}) => (
    <Item
      image={item.urlToImage}
      publishedAt={item.publishedAt}
      title={item.title}
      url={item.url}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>News</Text>
      </View>
      {loading ? <Loading /> : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.title + Math.random().toString()}
          ItemSeparatorComponent={Separator}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263238',
  },
  dateTime: {
    color: '#b6bab8',
    fontWeight: 'bold',
    fontSize: 12,
    paddingTop: 5,
  },
  flatlistContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  flatlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 110,
    justifyContent: 'center',
  },
  flatlistText: {
    color: 'white',
    fontFamily: 'serif',
    fontSize: 16,
    paddingTop: 10,
  },
  heading: {
    color: 'white',
    fontFamily: 'serif',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: SIZE.height > 700 ? 15 : 0,
    paddingBottom: 10,
    paddingTop: 10,
  },
  headingContainer: {
    backgroundColor: 'black',
    width: '100%',
    paddingLeft: 10,
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 10,
  },
  imageContainer: {
    height: 90,
    flex: 0.3,
    justifyContent: 'center',
  },
});

export default News;
