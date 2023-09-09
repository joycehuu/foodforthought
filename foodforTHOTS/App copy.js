import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import * as Location from 'expo-location';

export default function App() {
  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [position, setPosition] = useState(null);
  const[x, setX] = useState(0);
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

      await setLocation(Location.getCurrentPositionAsync({}));
      console.log("Got init pos");
    });
  }, []);

  async function onPress() {
    console.log(location);
    console.log(x);
    console.log(y);
    console.log(mapRegion);

    setLocation(await Location.getCurrentPositionAsync({}));




    setX(location.coords.longitude);
    setY(location.coords.latitude);
    setmapRegion({
      latitude: y,
      longitude: x,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

  }

  function logPos() {
    console.log(location);
  }

  useEffect(() => {
    console.log("Hello");
    console.log(position);
    console.log(position);


  },[]);



  return (
    <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: '100%', flex: 1 }}
          region={mapRegion}
          onPress={onPress}
        />
        <Text>Hello</Text>
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
