/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as S from './styles/OtherUserOutLineUIStyle';
import { GrShare } from 'react-icons/gr';
import { useQuery } from 'react-query';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';
import { awsURL } from '../../../config/ApiURL';
import axios from 'axios';


const OtherUserOutLineUI = ({ userId }) => {
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
                userId: userId,
            },
        };
        const response = await axios.get(`${awsURL}/api/user/info`, params)
        return response;
    }, {
        onSuccess: (response) => {
            setUserOutline(response.data[0]);
        }
    });

    if (userOutLine.isLoading) {
        return <div>...불러오는중</div>
    }

    console.log(userOutLine.imageUrl)

    return (
        <>
            <div css={S.userInfoBox}>
                <div css={S.userInfo}>
                    <div css={S.userInfoLeft}>
                        <div css={S.profileBox}>
                            <img src={userOutline.imageUrl} alt="" css={S.profilePhoto}/>
                        </div>
                    </div>
                    <div>
                        <div css={S.usernameBox}><div>{userOutline.name}</div> <button css={S.shareButton}><GrShare /></button></div>
                        <div css={S.Buttons}>
                            <button css={S.reviewButton}>리뷰 <em css={S.count}>{userOutline.postCount}</em></button>
                            <button css={S.pictureButton}>사진 <em css={S.count}>{userOutline.picCount}</em></button>
                            <button css={S.followingButton}>팔로잉<em css={S.count}> {userOutline.followeeCount}</em></button>
                            <button css={S.followerButton}>팔로워 <em css={S.count}>{userOutline.followerCount}</em></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OtherUserOutLineUI;