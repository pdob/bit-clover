import React, { 
  useEffect, 
  useState 
} from 'react';
import { 
  FlatList, 
  Image, 
  Pressable, 
  Text, 
  View, 
} from 'react-native';
import styles from '../config/styles';
import * as WebBrowser from 'expo-web-browser';
import moment from 'moment';


const API_KEY = 'Insert your NewsAPI Key here';
const endpoint = `https://newsapi.org/v2/everything?q=crypto&language=en&apiKey=${API_KEY}`;

const News = () => {

  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch(endpoint);
      const json = await response.json();
      setData(json.articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  const Item = ({ title, image, url, publishedAt }) => (
    <Pressable onPress={() => WebBrowser.openBrowserAsync(url)} style={styles.flatlistContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center', height: 90}}>
        <View style={{height: 90, flex: 0.3, justifyContent: 'center'}}>
          <Image
            style={{height: 80, width: 80, borderRadius: 10}}
            source={{uri: image}}
          />
        </View>
        <View style={{flex: 0.8}}>
          <Text style={styles.horizontalFlatListText}>{title}</Text>
          <Text 
            style={{
              color: '#b6bab8', 
              fontWeight: 'bold', 
              fontSize: 12, 
              paddingTop: 5
            }}
          >
            {moment(publishedAt).fromNow()}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <Item 
      image={item.urlToImage}
      publishedAt={item.publishedAt}
      title={item.title}
      url={item.url}
    />
  );

  const Separator = () => (
    <View style={{height: 0.7, color: 'black'}} />
  )


  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'black', width: '100%', paddingLeft: 10}}>
        <Text style={styles.settingsHeading}>News</Text>
      </View>
      <FlatList 
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.title + Math.random().toString()}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

export default News;