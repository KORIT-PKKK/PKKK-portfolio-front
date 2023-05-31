/** @jsxImportSource @emotion/react */
import Cookies from 'js-cookie';
import * as S from './styles/FollowerUIStyle';
import React from 'react';
import { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';

const FollowerUI = () => {
    const [followerList, setFollowerList] = useState([]);

    const searchFollowerList = useQuery(["searchFollowerList"], async () => {
        const userId = Cookies.get("userId");

        const response = await axiosInstance.get(`/api/user/subscribe/subMe`, { params: { userId: userId } })
        console.log(response.data);
        return response;
    }, {
        onSuccess: (response) => {
            setFollowerList(response.data)
        }
    });

    if (searchFollowerList.isLoading) {
        <div>불러오는 중...</div>
    }

    return (
        <>
            <div css={S.container}>
                <h1 css={S.title}>나를 팔로우 중</h1>
                {followerList.map(follower => (
                    <div css={S.userBox}>
                        <div css={S.photoBox}></div>
                        <div css={S.username}>{follower.name}</div>
                        <button css={S.stateButton}><BiUser />팔로우</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FollowerUI;