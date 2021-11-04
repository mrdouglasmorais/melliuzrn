import React from 'react';
import GetPokemon from './Util/ApiCall';

import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#FF22DD'}}>
      <View style={styles.header}>
        <Text style={styles.title}>Encontre seu Dog</Text>
      </View>
      <ScrollView
        style={styles.scrollStyle}
        contentInsetAdjustmentBehavior="automatic">
        <GetPokemon />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF22DD',
    height: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollStyle: {
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
  },
});

export default App;
