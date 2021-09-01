import React from 'react';
import { Image, View } from 'react-native';
import styles from '../config/styles';


const AppHeader = () => {
  return (
    <View>
      <View style={styles.header}> 
        <Image 
          source ={require('../assets/logo.png')}
          style={styles.logo}  
        />
      </View>
    </View>
  );
};

export default AppHeader;