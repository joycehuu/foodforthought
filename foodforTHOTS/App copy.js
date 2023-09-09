import { useAuth0, Auth0Provider } from 'react-native-auth0';
import React, { useState } from 'react';

import { Button, Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

// const LoginButton = () => {
//   const {authorize} = useAuth0();

//   const onPress = async () => {
//     console.log("I was pressed!");
//       try {

//           await authorize();
//       } catch (e) {
//           console.log(e);
//       }
//   };

//   return <Button onPress={onPress} title="Log in" />
// }

import MapView from 'react-native-maps';
// import Map from './components/Map';


export default App = () => {

  function onPress() {
    console.log("TAP");
  }

  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (

    <SafeAreaView style={styles.container}>
      <TouchableOpacity styles={{ width: "100%", height: "100%" }} onPress={onPress}>
        <Text>Hello</Text>
        <View>
          <MapView
            style={{ alignSelf: 'stretch', height: '100%', flex: 1 }}
            region={mapRegion}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
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