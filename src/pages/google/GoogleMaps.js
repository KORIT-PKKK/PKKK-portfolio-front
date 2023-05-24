import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const Maps = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyC2ofC8-Q_0eam9Xvi8e6iVr3viFYJGlVc"
      })
    
    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            },
            (error) => {
            console.error(error);
            }
        );
        }
    }, []);

    const [map, setMap] = React.useState(null)
    const [center, setCenter] = useState({ lat: 0, lng: 0 });

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [center]);
    
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    
      return isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
          </GoogleMap>
      ) : <></>
};

export default Maps;