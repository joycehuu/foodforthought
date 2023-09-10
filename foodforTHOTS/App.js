import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, Text, SafeAreaView, StatusBar, Modal, Alert, Pressable } from 'react-native';

import { useAuth0, Auth0Provider } from 'react-native-auth0';


import Map from './components/Map';
import Footer from './components/Footer';




export default function App() {

  const [showMakeEventModal, setShowMakeEventModal] = useState(false);

  function makeEventPressed() {
    console.log("props worked");
    setShowMakeEventModal(true);

  }


  return (
    // <Auth0Provider domain={"dev-5oixyu80z3ave16y.us.auth0.com"} clientId={"pyXeOLU9BFRKx06aID4z7mwxJgoGx6X6"}>
    <>
      <SafeAreaView style={styles.container}>


        <Map></Map>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showMakeEventModal}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setShowMakeEventModal(!showMakeEventModal);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setShowMakeEventModal(!showMakeEventModal)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
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
    justifyContent: "center",
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
    textAlign: 'center',
  },
});
