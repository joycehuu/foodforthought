import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {Platform, Alert, Modal, Pressable, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import * as Location from 'expo-location';
import Popup from './Popup';

export default function Map() {
  const [mapRegion, setmapRegion] = useState({
    latitude: 36.0014,
    longitude: 78.9382,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const[x, setX] = useState(0);
  const [y, setY] = useState(0);
  const[showPopup, setShowPopup] = useState(false);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      setLocation(await Location.getCurrentPositionAsync({}));
      console.log("Got init pos");
    });
  }, []);

  async function onMapPress() {
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

  async function onMarkerPress() {
    setShowPopup(true);
  }

  function logPos() {
    console.log(location);
  }


  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPopup}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          showPopup(!showPopup);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowPopup(!showPopup)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        <MapView
          style={{ alignSelf: 'stretch', height: '100%', flex: 1 }}
          region={mapRegion}
          onPress={onMapPress} 
        >
          <Marker 
          coordinate={mapRegion} title='Marker'
          onPress={() => setShowPopup(true)}
          onCalloutPress={() => setShowPopup(true)}>
          </Marker>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  }
});
