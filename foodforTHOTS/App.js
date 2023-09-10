import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, Text, SafeAreaView, StatusBar, Modal, Alert, Pressable, TextInput } from 'react-native';

import { useAuth0, Auth0Provider } from 'react-native-auth0';


import Map from './components/Map';
import Footer from './components/Footer';
import { Event } from "./models/Event";
import EventService from "./services/event-service";

import * as Location from 'expo-location';





export default function App() {

  useEffect(() => {
    // console.log("Fired");
    forceMapRender();

  }, []);

  const [latch, setLatch] = useState(false);


  function forceMapRender() {
    setLatch(!latch);
  }



  const [showMakeEventModal, setShowMakeEventModal] = useState(false);

  //values that the user can enter on modal
  const [newTitle, setNewTitle] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  const [newAddress, setNewAddress] = useState(null);
  const [newAllergens, setNewAllergens] = useState(null);
  const [newDescription, setNewDescription] = useState(null);

  function makeEventPressed() {
    // console.log("props worked");
    setShowMakeEventModal(true);
    getLoc();
  }

  async function getLoc() {
    let pos = await Location.getCurrentPositionAsync({});
    setNewLocation({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
  }

  async function onFormSubmitted() { //when press button, make new event.
    // console.log(newTitle);
    // console.log(Date.now());
    // console.log(newLocation);
    // console.log(newAddress);
    // console.log(newDescription);
    // console.log(newAllergens);
    try {
      let e = new Event(null, newTitle, Date.now(), newLocation, newAddress, newDescription, newAllergens);
      console.log(e);
      await EventService.createEvent(e);
      setLatch(!setLatch);

    } catch(e){
      console.log(e);
    }


  }


  return (
    // <Auth0Provider domain={"dev-5oixyu80z3ave16y.us.auth0.com"} clientId={"pyXeOLU9BFRKx06aID4z7mwxJgoGx6X6"}>
    <>
      <SafeAreaView style={styles.container}>


        <Map latch={latch}></Map>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showMakeEventModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            showMakeEventModal(!showMakeEventModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText1}>Event:</Text>
                <TextInput style={styles.modalText2} onChangeText={setNewTitle} placeholder='Title'></TextInput>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText1}>Location: </Text>
                <TextInput style={styles.modalText2} onChangeText={setNewAddress} placeholder='Address'></TextInput>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText1}>Description </Text>
                <TextInput style={styles.modalText2} onChangeText={setNewDescription} placeholder='Description'></TextInput>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText1}>Allergens: </Text>
                <TextInput style={styles.modalText2} onChangeText={setNewAllergens} placeholder='Allergens'></TextInput>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={onFormSubmitted}>
                  <Text style={styles.textStyle}>Submit Event</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setShowMakeEventModal(!showMakeEventModal)}>
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>

              </View>

            </View>
          </View>
        </Modal>


      </SafeAreaView>
      <StatusBar barStyle={"dark-content"} />
      <Footer onPress={makeEventPressed}></Footer>
    </>

    // </Auth0Provider>
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    justifyContent: "flex-start",
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
    color: 'black',
    fontWeight: 'bold',
  },
  modalText1: {
    flex: 1,
    marginLeft: 0,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalText2: {
    height: 5,
    margin: 5,
    borderWidth: 1,
    padding: 15,
    flex: 1,

  }
});
