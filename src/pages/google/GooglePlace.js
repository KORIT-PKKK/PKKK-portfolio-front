import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import React, { useState } from 'react';

const GooglePlace = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  const handleInfoWindowClose = () => {
    setSelectedPlace(null);
  };

  return (
    <div>
      <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: 35.1595, lng: 129.0599 }}
    >
      <Marker
        position={{ lat: 35.1595, lng: 129.0599 }}
        onClick={() =>
          handleMarkerClick({
            name: '삼정타워',
            address: '부산광역시 부산진구 양정동',
            phone: '010-1234-5678',
            businessHours: '09:00 AM - 06:00 PM'
          })
        }
      />
      {selectedPlace && (
        <InfoWindow
          position={{ lat: 35.1595, lng: 129.0599 }}
          onCloseClick={handleInfoWindowClose}
        >
          <div>
            <h2>{selectedPlace.name}</h2>
            <p>{selectedPlace.address}</p>
            <p>전화번호: {selectedPlace.phone}</p>
            <p>영업 시간: {selectedPlace.businessHours}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
    </div>
  );
};

export default GooglePlace;