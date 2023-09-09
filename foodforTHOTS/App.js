import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { useAuth0, Auth0Provider } from 'react-native-auth0';


import Map from './components/Map';



export default function App() {


  return (
    <Auth0Provider domain={"dev-5oixyu80z3ave16y.us.auth0.com"} clientId={"pyXeOLU9BFRKx06aID4z7mwxJgoGx6X6"}>
      <View style={styles.container}>
        <Map></Map>
      </View>
    </Auth0Provider>
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
