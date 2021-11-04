import React, {useState, useEffect} from 'react';
import request from '../Services/api';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';

function GetDogs() {
  const [dog, setDog] = useState([]);
  const [reload, setReLoad] = useState(false);
  useEffect(() => {
    request
      .get('')
      .then(response => {
        setDog(response.data);
      })
      .catch(() => alert('Houve um erro so se comunicar com a api'));
  }, [reload]);
  return (
    <View style={styles.default}>
      {dog.map((item, index) => (
        <View key={index}>
          <Image style={styles.dogPicture} source={item} />
          <>
            {item?.breeds?.map(breed => (
              <View>
                <Text>{breed.name}</Text>
                <Text>{breed.bred_for}</Text>
                <Text>{breed.temperament}</Text>
                <Text>{breed.origin}</Text>
              </View>
            ))}
          </>
        </View>
      ))}
      <Pressable
        style={styles.pressComponent}
        onPress={() => setReLoad(!reload)}>
        <Text style={styles.textPressable}>Ver próximo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  default: {
    alignItems: 'center',
  },
  dogPicture: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  pressComponent: {
    flex: 1,
    backgroundColor: '#FF22DD',
    paddingVertical: 12,
    width: Dimensions.get('window').width / 2,
  },
  textPressable: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default GetDogs;
