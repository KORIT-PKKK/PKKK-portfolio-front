import React, { useState } from 'react';
import FavPostUI from './model/FavPostUI';
import Cookies from 'js-cookie';
import { useQuery } from 'react-query';
import { axiosInstance } from '../../Controller/interceptors/TokenRefresher';

const FavPostView = () => {
    const [favPostList, setFavPostList] = useState([]);
    const rtk = Cookies.get("refreshToken");
    const authState = rtk !== undefined;

    const searchFavPostList = useQuery(["searchFavPostList"], async () => {
        const username = Cookies.get("username");
        const response = await axiosInstance.get(`/api/user/favorite/post/list`, { params: { username: username } })
        return response
    }, {
        enabled: authState,
        onSuccess: (response) => {
            setFavPostList(response.data)
        }
    });

    console.log(favPostList)

    if (searchFavPostList.isLoading) {
        <div>불러오는 중...</div>
    }

    return (
        <>
            {favPostList.map(favPost => (<FavPostUI favPost={favPost} key={favPost.postId} />))}
        </>
    );
};

export default FavPostView;