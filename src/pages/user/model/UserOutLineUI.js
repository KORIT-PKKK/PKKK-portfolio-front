/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as S from './styles/UserOutLineUIStyle';
import { useQuery } from 'react-query';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';

const UserOutLineUI = ({ currentUserId }) => {
    const [userOutline, setUserOutline] = useState({
        followeeCount: 0,
        followerCount: 0,
        imageUrl: "",
        introduce: "",
        name: "",
        picCount: 0,
        postCount: 0,
        userId: 0
    });

    const userOutLine = useQuery(["userOutLine"], async () => {
        const params = {
            params: {
                userId: currentUserId,
            },
        };
        const response = await axiosInstance.get(`/api/user/info`, params)
        console.log(response.data[0]);
        return response;
    }, {
        onSuccess: (response) => {
            setUserOutline(response.data[0]);
        }
    });

    if (userOutLine.isLoading) {
        return <div>...불러오는중</div>
    }

    return (
        <>
            <div css={S.userInfoBox}>
                <div css={S.photoBox}>
                    <img src={userOutline.imageUrl} alt="" css={S.profilePhoto}/>
                </div>
                <div css={S.userInfo}>
                    <div css={S.userName}>{userOutline.name}</div>
                    <div css={S.userFunctionBox}>
                        <div css={S.userFunction}>리뷰 {userOutline.postCount}</div>
                        <div css={S.wordSeparation}>·</div>
                        <div css={S.userFunction}>팔로잉 {userOutline.followeeCount}</div>
                        <div css={S.wordSeparation}>·</div>
                        <div css={S.userFunction}>팔로워 {userOutline.followerCount}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserOutLineUI;