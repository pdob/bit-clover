import React from 'react';
import {Image, View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';

const DisplayInfoHeader = ({image, name}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image
          source={require('../assets/icons/back-icon.png')}
          style={styles.headerBack}
        />
      </Pressable>
      <Image source={{uri: image}} style={styles.headerLogo} />
      <Text style={styles.headerTitle}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignContent: 'flex-start',
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
    width: 30,
  },
  headerLogo: {
    height: 25,
    marginRight: 8,
    width: 25,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
  },
});

export default DisplayInfoHeader;