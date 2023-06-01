/** @jsxImportSource @emotion/react */
import Cookies from 'js-cookie';
import * as S from './styles/FollowerUIStyle';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';
import FollowerBoxUI from './FollowerBoxUI';

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
                    <FollowerBoxUI follower={follower}/>
                ))}
            </div>
        </>
    );
};

export default FollowerUI;