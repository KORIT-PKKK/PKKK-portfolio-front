/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import * as S from './styles/GoogleMapsStyle';
import { useNavigate } from 'react-router-dom';
import { AiOutlineStar } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import { useMutation, useQuery } from 'react-query';
import { localURL } from '../../config/ApiURL';
import Cookies from 'js-cookie';
import axios from 'axios';
import { axiosInstance } from '../../Controller/interceptors/TokenRefresher';
import emptyStar from '../post/model/assets/icon_empty_star.svg';
import fullStar from '../post/model/assets/icon_full_star.svg';
import halfStar from '../post/model/assets/icon_half_star.svg';


const GoogleMaps = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 37.5665, lng: 126.9780 });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [locationList, setLocationList] = useState([]);
  const [locationFavState, setLocationFavState] = useState(false);
  const navigate = useNavigate();
  const rtk = Cookies.get("refreshToken");
  const authState = rtk !== undefined;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GCP_AUTH_KEY
  })

  const containerStyle = {
    width: '100%',
    height: '500px'
  };

  const myStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

  const onLoad = (map) => {
  };

  const onUnmount = (map) => {
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  const clickPlace = () => {
    navigate('/postAddView', { state: { locId: selectedMarker.locId } });
  }

  const searchLocationList = useQuery(["searchLocationList"], async () => {

    const userId = Cookies.get("userId");
    const response = await axios.get(`${localURL}/api/loc/list`, { params: { userId: userId } })
    return response;
  }, {
    onSuccess: (response) => {
      setLocationList(response.data)
    }
  });

  const addLocationFav = useMutation(async () => {
    const data = {
      "username": Cookies.get("username"),
      "elementId": selectedMarker.locId
    }
    try {
      const response = await axiosInstance.post(`/api/user/favorite/loc/add`, data);
      return response;
    } catch {
      alert("로그인 후 사용해주세요.");
    }
  }, {
    onSuccess: (response) => {
      if (response.status === 200) {
        setLocationFavState(true);
        alert(`${selectedMarker.locName}을(를) 즐겨찾기에 저장했습니다.`);
      }
    }
  });

  const undoLocationFav = useMutation(async () => {
    const data = {
      "elementId": selectedMarker.userLocFavId
    }
    try {
      const response = await axiosInstance.delete(`/api/user/favorite/loc/undo`, { data: data });
      return response;
    } catch {
      alert("로그인 후 사용해주세요.");
    }
  }, {
    onSuccess: (response) => {
      if (response === 200) {
        setLocationFavState(false);
        alert(`${selectedMarker.locName}을(를) 즐겨찾기에서 삭제했습니다.`);
      }
    }
  });

  if (searchLocationList.isLoading) {
    return <div>불러오는 중...</div>
  }

  const ratingHandler = (score) => {
    return (
      <div className="flex justify-center">
      <div
        className={`flex w-fit rounded-lg border-2 bg-slate-300 py-2 px-1  'border-yellow-400'
          `}
      >
        {Array(5)
          .fill(0)
          .map((_, index) => {
            return (
              <img
                key={index}
                src={score > index + 1 ? fullStar : emptyStar}
                data-star={index + 1}
                style={{ width: '30px', height: '30px' }}
                alt="star_image"
              />
            );
          })}
      </div>
    </div>
    );
  }


  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={17}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ disableDefaultUI: true, styles: myStyles }}
      >
        {locationList.map(location => (
          <MarkerF
            key={location.locId}
            position={{ lat: location.lat, lng: location.lng }}
            icon={{
              url: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`,
              scaledSize: new window.google.maps.Size(32, 32)
            }}
            onClick={(e) => {
              setSelectedMarker({
                lat: location.lat,
                lng: location.lng,
                title: location.locName,
                locId: location.locId,
                userLocFavId: location.userLocFavId,
                evalScore: location.evalScore
              });
              const userLocFavId = location.userLocFavId;
              if (userLocFavId === null) {
                setLocationFavState(false);
              } else {
                setLocationFavState(true);
              }
            }}
            title={location.locName} />
        ))}
        {selectedMarker && (
          <InfoWindowF
            position={selectedMarker}
            options={{ pixelOffset: new window.google.maps.Size(0, -25) }}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
          >
            <div css={S.placeInfo}>
              <h1 css={S.title}>{selectedMarker.title}</h1>
              {(selectedMarker.evalScore === null)
                ? <h1>아직 평점이 없어요.</h1>
                : <h1>평점: {ratingHandler(selectedMarker.evalScore)}</h1>}
              {authState ? (
                locationFavState ? (
                  <div onClick={() => undoLocationFav.mutate()} css={S.unSave}>
                    <AiFillStar css={S.unSaveIcon} /> 저장
                  </div>
                ) : (
                  <div onClick={() => addLocationFav.mutate()} css={S.save}>
                    <AiOutlineStar css={S.saveIcon} /> 저장
                  </div>
                )
              ) : <></>}
              <h1 onClick={clickPlace} css={S.writeButton}>리뷰 작성하기</h1>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </>
  ) : <></>;
};

export default GoogleMaps;

// const [map, setMap] = React.useState(null);
// const [center, setCenter] = useState({ lat: 0, lng: 0 });

// const { isLoaded } = useJsApiLoader({
//   id: 'google-map-script',
//   googleMapsApiKey: ""
// });

// useEffect(() => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setCenter({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         });
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }
// }, []);

// const onLoad = React.useCallback(function callback(map) {
//   const bounds = new window.google.maps.LatLngBounds(center);
//   map.fitBounds(bounds);
//   setMap(map);
// }, [center]);

// const onUnmount = React.useCallback(function callback(map) {
//   setMap(null);
// }, []);