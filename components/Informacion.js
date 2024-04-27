import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderLista from './HeaderLista';

const Informacion = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <HeaderLista navigation={navigation}/>
      <Text>Hola</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default Informacion;
