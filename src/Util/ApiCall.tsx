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

import LottieView from 'lottie-react-native';

interface IBreedsPet {
  id: number;
  name: string;
  bred_for: string;
  bred_group: string;
  temperament: string;
  origin: string;
}

interface IFindYouDogData {
  id: string;
  url: string;
  breeds?: IBreedsPet[];
}

const GetDogs: React.FC = () => {
  const [dog, setDog] = useState<IFindYouDogData[]>([]);
  const [reload, setReLoad] = useState(false);
  const [isLoad, setIsload] = useState(false);
  useEffect(() => {
    setIsload(true);
    request
      .get('')
      .then(response => {
        setDog(response.data);
      })
      .catch(() => alert('Houve um erro so se comunicar com a api'))
      .finally(() => {
        setTimeout(() => {
          setIsload(false);
        }, 2000);
      });
  }, [reload]);

  if (isLoad) {
    return (
      <View style={styles.default}>
        <LottieView
          source={require('../Animation/load-dog.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
    );
  }
  return (
    <View style={styles.default}>
      {dog.map((item, index) => (
        <View key={index}>
          <Image style={styles.dogPicture} source={{uri: item.url}} />
          <>
            {item?.breeds?.map(breed => (
              <View key={breed.id}>
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
};

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
  animation: {
    height: 500,
    width: 500,
  },
});

export default GetDogs;
