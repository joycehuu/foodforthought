import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import * as Location from 'expo-location';

export default function Map() {
  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let pos = await Location.getCurrentPositionAsync({});
      setLocation(pos);
      console.log("Got init pos");
    });
  }, []);

  async function onPress() {
    console.log(location);
    console.log(x);
    console.log(y);
    console.log(mapRegion);

    let pos = await Location.getCurrentPositionAsync({});

    if (pos != null) {
      setLocation(pos);
      setX(pos?.coords?.longitude);
      setY(pos?.coords?.latitude);
      setmapRegion({
        latitude: y,
        longitude: x,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }



  }

  function logPos() {
    console.log(location);
  }


  

  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%', flex: 1 }}
        region={mapRegion}
        onPress={onPress}
        provider='google'
        showsCompass="true"
        followsUserLocation="true"
      >
        <Marker
          description="Delivery person 1"
          coordinate={{latitude: 36.005, longitude: -78.94}}
          pinColor='red'
          title='Marker 1'          
          />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
