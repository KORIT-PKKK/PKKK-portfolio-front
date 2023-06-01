import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './styles/FollowerBoxUIStyle';
import { BiUser } from 'react-icons/bi';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';

const FollowerBoxUI = ({follower}) => {
    const [subState, setSubState] = useState(false);

    useEffect(() => {
        const userSubId = follower.userSubId;
        if (userSubId === null) {
            setSubState(false);
        } else {
            setSubState(true);
        }
    }, [follower.userSubId]);


    const addSub = useMutation(async () => {
        const data = {
            "userId": Cookies.get("userId"),
            "subUserId": follower.userId
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
                alert(`${follower.name}님을 팔로우 합니다.`);
            }
        }
    });

    const unSub = useMutation(async () => {
        const data = {
            "elementId": follower.userSubId
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
                alert(`${follower.name}님을 언팔로우 했습니다.`);
            }
        }
    });
    
    return (
        <>
          <div css={S.userBox}>
                <div css={S.photoBox}></div>
                <div css={S.username}>{follower.name}</div>
                {subState
                ? 
                <button css={S.unStateButton} onClick={() => { unSub.mutate() }}>언팔로우</button>
                :
                <button css={S.stateButton} onClick={() => { addSub.mutate() }}>팔로우</button>
                }
            </div>  
        </>
    );
};

export default FollowerBoxUI;