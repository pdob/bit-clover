import React from 'react';
import { Modal, StyleSheet, View, TextInput, Pressable, Text, Image } from 'react-native';

const MySearchBar = ({visible, onRequestClose, value, onChangeText, setVisible}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onRequestClose}
      animationType='slide'        
    >
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={onChangeText}
          placeholder="Search coins"
          placeholderTextColor="#b6bab8"
          value={value}
          containerStyle={styles.inputContainer}
          textAlign='center'
          style={styles.input}
          autoFocus
        />
        <Pressable style={styles.cancelContainer} onPress={setVisible}>
          <Text style={styles.text}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default MySearchBar;

const styles = StyleSheet.create({
  cancelContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '25%',
    paddingRight: 20
  },
  inputContainer: {
    backgroundColor: '#102027',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 20,
    alignItems: 'center',
  },
  input: {
    borderRadius: 20,
    width: '40%',
    height: 40,
    color: '#b6bab8',
    fontSize: 15,
    fontWeight: '700',
    backgroundColor: '#495f6b',
    marginRight: '5%'
  },
  text: {
    color: '#b6bab8',
    fontSize: 15,
    fontWeight: '700',
  },
});