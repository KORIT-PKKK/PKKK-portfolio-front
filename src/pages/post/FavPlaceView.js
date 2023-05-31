import React from 'react';
import FavPlaceUI from './model/FavPlaceUI';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { axiosInstance } from '../../Controller/interceptors/TokenRefresher';

const FavPlaceView = () => {
    const [favPlaceList, setfavPlaceList] = useState([]);
    const rtk = Cookies.get("refreshToken");
    const authState = rtk !== undefined;

    const searchFavPlaceList = useQuery(["searchFavPlaceList"], async () => {
        const username = Cookies.get("username");
        const response = await axiosInstance.get(`/api/user/favorite/loc/list`, { params: { username: username } })
        return response
    }, {
        enabled: authState,
        onSuccess: (response) => {
            setfavPlaceList(response.data)
        }
    });

    console.log(favPlaceList)
    if (searchFavPlaceList.isLoading) {
        <div>불러오는 중...</div>
    }

    return (
        <>
            {favPlaceList.map(favPlace => (<FavPlaceUI favPlace={favPlace} key={favPlace.locId} />))}
        </>
    );
};

export default FavPlaceView;