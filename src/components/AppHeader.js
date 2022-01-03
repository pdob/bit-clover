import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const AppHeader = () => {
  return (
    <View>
      <View style={styles.header}> 
        <Image 
          source ={require('../assets/logo.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%'
  },
  image: {
    height: 30,
    width: 150
  }
})

export default AppHeader;