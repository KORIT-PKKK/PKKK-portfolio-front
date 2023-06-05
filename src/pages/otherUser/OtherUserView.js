/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/OtherUserViewStyle';
import LogoUI from '../model/LogoUI';
import { useLocation, useNavigate } from 'react-router-dom';
import OtherUserOutLineUI from './model/OtherUserOutLineUI';
import ButtonUI from './model/ButtonUI';
import { useQuery } from 'react-query';
import { localURL } from '../../config/ApiURL';
import axios from 'axios';
import { useState } from 'react';
import UserPostUI from './model/UserPostUI';
import Cookies from 'js-cookie';

const OtherUserView = () => {
    const location = useLocation();
    const puId = location.state.userId;
    const [userPosts, setUserPosts] = useState([]);
    const rtk = Cookies.get("refreshToken");
    const authState = rtk !== undefined;

    const userPostOverView = useQuery(["userPostOverView"], async () => {

        if (rtk === undefined) {
            const params = {
                params: {
                    puId: puId
                },
            };
            const response = await axios.get(`${localURL}/api/post/user`, params)
            return response;
        }

        const userId = Cookies.get("userId");
        const params = {
            params: {
                puId: puId,
                userId: userId
            },
        };
        const response = await axios.get(`${localURL}/api/post/user`, params)
        return response;

    }, {
        onSuccess: (response) => {
            setUserPosts(response.data);
        }
    });

    const navigate = useNavigate();

    const menuClickHandle = (path) => {
        navigate(path);
    }

    if (userPostOverView.isLoading) {
        <div>불러오는 중...</div>
    }

    return (
        <>
            <LogoUI onClick={menuClickHandle} />
            <div css={S.userOutLine}>
                <OtherUserOutLineUI userId={puId}/>
                {authState
                    ? <ButtonUI post={userPosts[0]} />
                    :
                    <></>
                }
            </div>
            <div css={S.container}>
                <div css={S.reviewContainer}>
                    {userPosts.map(post => (
                        <UserPostUI key={post.postId} post={post} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default OtherUserView;