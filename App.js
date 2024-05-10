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
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(true);
 const gasData = useRef()
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

// make api call for gas prices

       //const res = await fetch("https://blogapi1200.fly.dev/api/comments")
const fetchCommentInfo = async () => {
const url = 'https://gas-price.p.rapidapi.com/usaCitiesList';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e00a73a016msh777ec730a1ccdf4p18d6b4jsn48565e487f12',
		'X-RapidAPI-Host': 'gas-price.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}




}


/*
const fetchCommentInfo = async () => {
     //setLoading(true)
 try {
     const res = await fetch('https://gas-price.p.rapidapi.com/usaCitiesList', {
method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e00a73a016msh777ec730a1ccdf4p18d6b4jsn48565e487f12',
		'X-RapidAPI-Host': 'gas-price.p.rapidapi.com'
	}
           })



       const apiData = await res.json();
      console.log(apiData)
       //setData
       gasData.current = apiData

     }

     catch (error) {
       console.error("There has been a problem with your fetch operation:", error);
       //add error message to dom
       setError(true)

     }
     setLoading(false)

   }


   useEffect(() => {
     fetchCommentInfo();
   }, [])

   //display error and loading for api call

   if (error) return (
     <View>

       <Text>A network error was encountered</Text>
     </View>
   )

   //if (loading) return <p>Loading...</p>;
*/


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