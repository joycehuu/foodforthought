import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Platform, StyleSheet, TouchableOpacity, View, Text, Modal, Pressable, useAnimatedValue } from 'react-native';

import * as Location from 'expo-location';

import EventService from "../services/event-service";
import moment from 'moment/moment';

export default function Map(props) {
  const [mapRegion, setmapRegion] = useState({
    latitude: 36.0014,
    longitude: -78.9,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [curTitle, setCurTitle] = useState(null);
  const [curLocation, setCurLocation] = useState(null);
  const [curTime, setCurTime] = useState(null);
  const [curAddr, setCurAddr] = useState(null);
  const [curDesc, setCurDesc] = useState(null);
  const [curAll, setCurAll] = useState(null)

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);

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
      // console.log("Got init pos");
    });
  }, [props.latch]);

  useEffect(() => {
    try {
      getStuff();

    } catch { }
  }, [props.latch]);


  useEffect(() => {
    // console.log("Update to local events:");
    // console.log(events);
    // console.log(events.length);
  }, [events]);

  async function getStuff() {
    // console.log("Fetching Events");
    tempArr = await EventService.fetchEvents();
    setEvents(tempArr);
    // console.log("Events fetched!");
    // console.log(events);
    // console.log(events.length);
  }

  function onMarkerPress(e) {
    setCurTitle(e.title);
    setCurLocation(e.location);
    setCurTime(moment(e.time).format("MMMM Do YYYY, h:mm:ss a"));
    setCurAddr(e.address);
    setCurDesc(e.description);
    setCurAll(e.allergies);
    console.log(e);
    



    setShowPopup(true);
  }

  async function onMapPress() {
     console.log(location);
    // console.log(x);
    // console.log(y);
    // console.log(mapRegion);

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
            <Text style={styles.modalText1}>Event: <Text style={styles.modalText2}>{curTitle}</Text></Text>
            <Text style={styles.modalText1}>Location: <Text style={styles.modalText2}>{curAddr}</Text></Text>
            <Text style={styles.modalText1}>Time Posted: <Text style={styles.modalText2}>{curTime}</Text></Text>
            <Text style={styles.modalText1}>Description: <Text style={styles.modalText2}>{curDesc}</Text></Text>
            <Text style={styles.modalText1}>Allergens: <Text style={styles.modalText2}>{curAll}</Text></Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowPopup(!showPopup)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <MapView
        style={{ alignSelf: 'stretch', height: '100%', flex: 1 }}
        region={mapRegion}
        onPress={onMapPress}
        provider='google'
        showsCompass="true"
      >

        {events.map((event) =>
          <Marker
            key={event.title}
            description={event?.description || "No Data"}
            coordinate={{ latitude: event.location?.latitude || 36, longitude: event.location?.longitude || -78.93 }}
            pinColor='red'
            title={event?.title || "No Data"}
            onPress={() => onMarkerPress(event)}
            onCalloutPress={() => onMarkerPress(event)}
          >

          </Marker>

        )}


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
    marginLeft: 0,
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
  modalText1: {
    marginLeft: 0,
    marginBottom: 15,
    fontSize: 25,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  modalText2: {
    marginLeft: 0,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'normal',
  }
});
