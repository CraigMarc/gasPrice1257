//import React from 'react';
import { useState, useEffect, useRef } from 'react'
import Geolocation from '@react-native-community/geolocation';
//import {PermissionsAndroid} from 'react-native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid,
} from 'react-native';

// request permission to use geolocation

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Access Required",
        message: "This app needs to access your location.",
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Location permission granted");
    } else {
      console.log("Location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

const App = () => {

 const [location, setLocation] = useState(false);
 const latitude = useRef()
 const longitude = useRef()

 // get user location

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }

    Geolocation.getCurrentPosition(
      (position) => {
       //console.log(position);
      setLocation(position)
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );


  }, []);


if (location)
{
latitude.current = location.coords.latitude
}
if (location) {
longitude.current = location.coords.longitude
}

console.log(latitude.current)
console.log(longitude.current)

  return (
    <View style={styles.container}>
      <Text>Your current location is:</Text>
      <Text>Latitude: {location ? location.coords.latitude : null}</Text>
      <Text>Longitude: {location ? location.coords.longitude : null}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;