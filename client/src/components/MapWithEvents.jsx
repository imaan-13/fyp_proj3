// import React, { useEffect, useRef } from 'react';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
// import L from 'leaflet';
// import 'leaflet-control-geocoder';
// const EventMap = ({ events, radius }) => {
//     const mapRef = useRef(null);
  
//     useEffect(() => {
//       if (!mapRef.current) {
//         // Create a Leaflet map
//         const map = L.map('map').setView([0, 0], 2);
  
//         // Add a Tile Layer (OpenStreetMap)
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
//         }).addTo(map);
  
//         // Create a LatLngBounds object to encompass all markers
//         const bounds = new L.LatLngBounds();
  
//         // Use Geolocation API to get the current user's location
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const userLocation = [position.coords.latitude, position.coords.longitude];
  
//             // Set the view to the user's location with the default radius
//             map.setView(userLocation, radius);
  
//             // Create a Geocoder control and add it to the map
//             const geocoder = L.Control.geocoder({
//               defaultMarkGeocode: false,
//             })
//               .on('markgeocode', function (e) {
//                 // Clear existing markers
//                 map.eachLayer((layer) => {
//                   if (layer instanceof L.Marker) {
//                     layer.remove();
//                   }
//                 });
  
//                 // Create an array to store all markers
//                 const markers = events.map((event) => {
//                   const redIcon = new L.Icon({
//                     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//                     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//                     iconSize: [25, 41],
//                     iconAnchor: [12, 41],
//                     popupAnchor: [1, -34],
//                     shadowSize: [41, 41],
//                   });
  
//                   // Create a marker with a red icon
//                   const marker = L.marker([event.locationLangitude, event.locationLongitude], { icon: redIcon })
//                     .bindPopup(`<strong>${event.eventName}</strong><br>${event.address}`);
  
//                   // Add the marker to the map
//                   marker.addTo(map);
  
//                   // Extend the bounds to include the marker's coordinates
//                   bounds.extend([event.locationLangitude, event.locationLongitude]);

//                   mapRef.current = map;
  
//                   return marker;
//                 });
  
//                 // Fit the map to the bounds of all markers
//                 map.fitBounds(bounds);
  
//                 const bbox = e.geocode.bbox;
//                 const poly = L.polygon([
//                   bbox.getSouthEast(),
//                   bbox.getNorthEast(),
//                   bbox.getNorthWest(),
//                   bbox.getSouthWest(),
//                 ]).addTo(map);
//               })
//               .addTo(map);
//           },
//           (error) => {
//             console.error('Error getting user location:', error);
//           }
//         );
  
//         mapRef.current = map;
//       }
//     }, [events, radius]);
  
//     return (
//       <div id="map" style={{ width: '400px', height: '400px' }}>
//         {/* No need to display coordinates in this div */}
//       </div>
//     );
//   };
  
//   export default EventMap;
  
import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const EventMap = ({ events, radius }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Create a Leaflet map
      const map = L.map('map').setView([0, 0], 2);
      mapRef.current = map; // Set the current map reference

      // Add a Tile Layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    }

    // Use Geolocation API to get the current user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [position.coords.latitude, position.coords.longitude];

        // Calculate the optimal zoom level based on the radius and marker position
        const optimalZoom = calculateOptimalZoom(userLocation, radius);

        // Set the view to the user's location with the calculated zoom level
        mapRef.current.setView(userLocation, optimalZoom);

        // Add markers with event details
        events.forEach((event) => {
          const redIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          });

          // Create a marker with a red icon
          L.marker([event.locationLangitude, event.locationLongitude], { icon: redIcon })
            .bindPopup(`<strong>${event.eventName}</strong><br>${event.address}`)
            .addTo(mapRef.current);
        });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, [events, radius]);

  // Function to calculate optimal zoom level based on the radius and marker position
  const calculateOptimalZoom = (center, radius) => {
    const diameter = radius * 2;
    const viewBounds = L.latLngBounds(L.latLng(center[0] - radius, center[1] - radius), L.latLng(center[0] + radius, center[1] + radius));
    const mapSize = mapRef.current.getSize();
    const optimalZoom = mapRef.current.getBoundsZoom(viewBounds, false, mapSize);
    return optimalZoom;
  };

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}>
      {/* No need to display coordinates in this div */}
    </div>
  );
};

export default EventMap;
