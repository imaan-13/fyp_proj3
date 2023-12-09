// Your React component
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
const LocationTracker = () => {
    
  const { _id} = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Get current location using the browser's geolocation API
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          console.log(latitude)
          setLongitude(position.coords.longitude);
          console.log(longitude)
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
    }
  };

  const saveLocation = async () => {
    console.log(longitude,latitude);
    const requestData = {
      userId: _id,
      latitude:latitude,
      longitude:longitude,
    };
    try {
      const response = await fetch(`http://localhost:3000/users/coordinates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
        requestData
        ),
      });

      const data = await response.json();
  
      if (!data.ok) {
        console.log(data);
        throw new Error('Failed to save location');
      }
    
      console.log('Location saved successfully');
    }
    catch (error) {
      console.error('Error saving location:', error.message);
    }
  };
  useEffect(() => {


    getCurrentLocation();
    saveLocation();
  })

  // Save the location to the server
//   const saveLocation = async () => {
//     try {
//       await axios.post('http://localhost:3000/users/save-coordinates', {
//         latitude,
//         longitude,
//       });
//       console.log('Location saved successfully');
//     } catch (error) {
//       console.error('Error saving location:', error);
//     }
//   };


  

  return (
    <div>
      {/* <button onClick={getCurrentLocation}>Get Current Location</button> */}
      {/* {latitude && longitude && (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          <button onClick={saveLocation}>Save Location</button>
        </div>
      )} */}
    </div>
  );
};

export default LocationTracker;
