import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Error = () => (
  <View style={styles.container}>
    <Text style={styles.errorText}>
      Unfortunately, something went wrong and we were unable to download data.
      {'\n'} Please check your internet connection and try again.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  messageText: {
    fontSize: 20,
    color: 'white',
  },
});

export default Error;