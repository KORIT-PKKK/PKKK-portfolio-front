/** @jsxImportSource @emotion/react */
import { useMutation } from 'react-query';
import * as S from './styles/FollowingBoxStyle';
import React from 'react';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';

const FollowingBoxUI = ({following}) => {

    const unSub = useMutation(async () => {
        const data = {
            "elementId": following.userSubId
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
                alert(`${following.name}님을 언팔로우 했습니다.`);
            }
        }
    });

    return (
        <>
            <div css={S.userBox}>
                <div css={S.photoBox}></div>
                <div css={S.username}>{following.name}</div>
                <button css={S.unStateButton} onClick={() => { unSub.mutate() }}>언팔로우</button>
            </div>   
        </>
    );
};

export default FollowingBoxUI;