import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

const AddMap = ({ onLocationChange }) => {
  const mapRef = useRef(null);
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [latitude,setLatitude]=useState(0);
  const [longitude,setLongitude]=useState(0);
 
  useEffect(() => {
    if (!mapRef.current) {
      // Create a Leaflet map
      const map = L.map('map').setView([0, 0], 2);

      // Add a Tile Layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Create a Geocoder control and add it to the map
      const geocoder = L.Control.geocoder({
        defaultMarkGeocode: false,
      })
        .on('markgeocode', function (e) {
          const newCoords = e.geocode; // Extract the coordinates
          console.log("full",newCoords)
          console.log("lat",newCoords.center.lat);
          console.log("long",newCoords.center.lng);
          console.log("address",newCoords.name);
          setLatitude(newCoords.center.lat)
          setLongitude(newCoords.center.lng)
          setCoords(newCoords);
          onLocationChange(newCoords.center.lat, newCoords.center.lng,newCoords.name);
          const bbox = e.geocode.bbox;
          const poly = L.polygon([
            bbox.getSouthEast(),
            bbox.getNorthEast(),
            bbox.getNorthWest(),
            bbox.getSouthWest(),
          ]).addTo(map);
          map.fitBounds(poly.getBounds());
        })
        .addTo(map);

      mapRef.current = map;
    }
  }, []); // Empty dependency array ensures this effect runs once on mount
 
  return (
    <div id="map" style={{ width: '400px', height: '400px' }}>
      <p>
        {coords ? `coordinates: ${JSON.stringify(coords)}` : 'No coordinates available'}
      </p>
    </div>
  );
};

export default AddMap;
