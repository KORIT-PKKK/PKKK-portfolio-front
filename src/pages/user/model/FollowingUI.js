/** @jsxImportSource @emotion/react */
import * as S from './styles/FollowingUIStyle';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';
import Cookies from 'js-cookie';
import FollowingBoxUI from './FollowingBoxUI';

const FollowingUI = () => {
    const [followingList, setFollowingList] = useState([]);

    const searchFollowingList = useQuery(["searchFollowingList"], async () => {
        const userId = Cookies.get("userId");

        const response = await axiosInstance.get(`/api/user/subscribe/subTo`, { params: { userId: userId } })
        console.log(response.data)
        return response;
    }, {
        onSuccess: (response) => {
            setFollowingList(response.data)
        }
    });

    if (searchFollowingList.isLoading) {
        <div>불러오는 중...</div>
    }

    return (
        <>
            <div css={S.container}>
                <h1 css={S.title}>팔로우 중</h1>
                {followingList.map(following => (
                    <FollowingBoxUI following={following} />
                )
                )}
            </div>
        </>
    );
};

export default FollowingUI;