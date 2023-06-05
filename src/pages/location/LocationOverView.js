import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderUI from './model/HeaderUI';
import PlaceUI from './model/PlaceUI';
import PostDetailUI from './model/LocationPostUI';
import { localURL } from '../../config/ApiURL';
import { useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

const LocationOverView = () => {
    const location = useLocation();
    const locId = location.state.locId;
    const rtk = Cookies.get("refreshToken");

    const [locationPosts, setLocationPosts] = useState([]);
    const [locDetail, setLocDetail] = useState({});

    const navigate = useNavigate();

    const menuClickHandle = (path) => {
        navigate(path);
    }

    const postLocationView = useQuery(["postLocationView"], async () => {
        if (rtk === undefined) {
            const params = {
                params: {
                    locId: locId
                }
            }
            const response = await axios.get(`${localURL}/api/post/location`, params);
            return response;
        }

        const userId = Cookies.get("userId");
        const params = {
            params: {
                locId: locId,
                userId: userId
            }
        }
        const response = await axios.get(`${localURL}/api/post/location`, params);
        return response;
    }, {
        onSuccess: (response) => {
            setLocationPosts(response.data);
        }
    });

    const searchLocDetail = useQuery(["searchLocDetail"], async () => {

        const userId = Cookies.get("userId");

        const response = await axios.get(`${localURL}/api/loc/detail`, { params: { userId: userId, locId: locId } })
        return response;

    }, {
        onSuccess: (response) => {
            setLocDetail(response.data)
        }
    });

    if (postLocationView.isLoading) {
        <div>불러오는 중...</div>
    }

    if (searchLocDetail.isLoading) {
        <div>불러오는 중...</div>
    }

    return (
        <>
            <HeaderUI onClick={menuClickHandle} />
            <PlaceUI locDetail={locDetail} />
            {locationPosts.map((locationPost, index) => (
                <PostDetailUI key={index} locationPost={locationPost} />
            ))}
        </>
    );
};

export default LocationOverView;