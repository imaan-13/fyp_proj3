import React, { useEffect, useState } from 'react';
import ReactMapGL, { GeolocateControl, NavigationControl } from 'react-map-gl';
import Map from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';


const AddMap = () => {
    return <Map
    mapLib={maplibregl}
    
    maplibreLogo  // This will generate a TypeScript error because it's not defined in Mapbox options
    />;
//   let mapboxApiAccessToken ="";
//   useEffect(()=>{

//      mapboxApiAccessToken = "pk.eyJ1IjoiYXdhaXNtaXJ6YSIsImEiOiJjbG00MDFwYnYxM240M2pzNmlwbnZnNjRmIn0.9ayeJR_-jg9_-U3rhyZqrA"
//   },[mapboxApiAccessToken])
  
};

export default AddMap;
