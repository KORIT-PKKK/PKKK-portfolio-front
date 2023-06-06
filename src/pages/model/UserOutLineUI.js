/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as S from './styles/UserOutLineUIStyle';
import { GrShare } from 'react-icons/gr';
import { useQuery } from 'react-query';
import { axiosInstance } from '../../Controller/interceptors/TokenRefresher';
import { awsURL } from '../../config/ApiURL';


const UserOutLineUI = ({ currentUserId, onClick }) => {
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
        const response = await axiosInstance.get(`${awsURL}/api/user/info`, params)
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
                <div css={S.userInfo}>
                    <div css={S.userInfoLeft}>
                        <div css={S.profileBox} onClick={() => onClick('/userUpdate')}>
                            <img src={userOutline.imageUrl} alt="" css={S.profilePhoto}/>
                        </div>
                    </div>
                    <div>
                        <div css={S.usernameBox} onClick={() => onClick('/userUpdate')}><div css={S.username}>{userOutline.name}</div> <button css={S.shareButton}><GrShare /></button></div>
                        <div css={S.Buttons}>
                            <button css={[S.userOutLineButton, { backgroundColor: '#dbdbdb' }]} onClick={() => onClick('/timeLine')}>리뷰 <em css={S.count}>{userOutline.postCount}</em></button>
                            <button css={[S.userOutLineButton, { backgroundColor: '#dbdbdb' }]} onClick={() => onClick('/timeLine')}>사진 <em css={S.count}>{userOutline.picCount}</em></button>
                            <button css={[S.userOutLineButton, { backgroundColor: '#dbdbdb' }]} onClick={() => onClick('/follow/following')}>팔로잉 <em css={S.count}>{userOutline.followeeCount}</em></button>
                            <button css={[S.userOutLineButton, { backgroundColor: '#dbdbdb' }]} onClick={() => onClick('/follow/follower')}>팔로워 <em css={S.count}>{userOutline.followerCount}</em></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserOutLineUI;