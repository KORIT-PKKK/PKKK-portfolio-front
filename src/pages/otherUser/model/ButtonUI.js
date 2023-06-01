/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as S from './styles/ButtonUIStyle';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';

const ButtonUI = ({ post }) => {
    const [subState, setSubState] = useState(false);

    useEffect(() => {
        if (post && post.userSubId !== undefined) {
            const userSubId = post.userSubId;

            if (userSubId === null) {
                setSubState(false);
            } else {
                setSubState(true);
            }
        }
    }, [post]);

    const addSub = useMutation(async () => {
        const data = {
            "userId": Cookies.get("userId"),
            "subUserId": post.userId
        }
        try {
            const response = await axiosInstance.post(`/api/user/subscribe/add`, data);
            return response;
        } catch {
            alert("로그인 후 사용해주세요.");
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                setSubState(true);
                alert(`${post.name}님을 팔로우 합니다.`);
            }
        }
    });

    const unSub = useMutation(async () => {
        const data = {
            "elementId": post.userSubId
        }
        try {
            const response = await axiosInstance.delete(`/api/user/subscribe/unSub`, { data: data });
            return response;
        } catch {
            alert("로그인 후 사용해주세요.");
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                setSubState(false);
                alert(`${post.name}님을 언팔로우 했습니다.`);
            }
        }
    });

    console.log(post);
    return (
        <>
            <div css={S.buttonBox} >
                {subState ?
                    <button css={S.unFollowbutton} onClick={() => { unSub.mutate() }}>언팔로우</button>
                    :
                    <button css={S.followbutton} onClick={() => { addSub.mutate() }}>팔로우</button>
                }
            </div>
        </>
    );
};

export default ButtonUI;