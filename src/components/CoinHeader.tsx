import React from 'react';
import { 
  Image, 
  View, 
  Text, 
  Pressable,
  StyleSheet 
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import icons from '../constants/icons';

const CoinHeader = ({ image, name }) => {

  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <View style={{flexDirection: 'row', alignContent: 'flex-start'}}>
          <Image 
            source={icons.back}
            style={styles.headerBack}
          />
        </View>
      </Pressable> 
      <Image 
        source ={{uri: image}}
        style={styles.headerLogo}  
      />
      <Text style={styles.headerTitle}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default CoinHeader;