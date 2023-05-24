/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as S from './styles/OtherUserOutLineUIStyle';
import { GrShare } from 'react-icons/gr';
import axios from 'axios';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';


const OtherUserOutLineUI = ({ onClick }) => {
    // const accessToken = Cookies.get('accessToken');
    // const accessTokenDecodedToken = jwtDecode(accessToken);
    // const [userOutline, setUserOutline] = useState({
    //     followeeCount: 0,
    //     followerCount: 0,
    //     imageUrl: "",
    //     introduce: "",
    //     name: "",
    //     picCount: 0,
    //     postCount: 0,
    //     userId: 0
    // });

    // const userOutLine = useQuery(["userOutLine"], async () => {
    //     const params = {
    //         params: {
    //             userId: accessTokenDecodedToken.userId,
    //         },
    //     };
    //     const response = await axios.get("http://192.168.2.18:8080/api/user/info", params)
    //     console.log(response.data[0]);
    //     return response;
    // }, {
    //     onSuccess: (response) => {
    //         setUserOutline(response.data[0]);
    //     }
    // });

    // if (userOutLine.isLoading) {
    //     <div>...불러오는중</div>
    // }

    return (
        <>
            <div css={S.userInfoBox}>
                <div css={S.userInfo}>
                    <div css={S.userInfoLeft}>
                        <div css={S.profileBox}></div>
                    </div>
                    <div>
                        <div css={S.usernameBox}><div css={S.username}></div> <button css={S.shareButton}><GrShare /></button></div>
                        <div css={S.Buttons}>
                            <button css={S.reviewButton}>리뷰 <em css={S.count}></em></button>
                            <button css={S.pictureButton}>사진 <em css={S.count}></em></button>
                            <button css={S.followingButton}>팔로잉 <em css={S.count}></em></button>
                            <button css={S.followerButton}>팔로워 <em css={S.count}></em></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OtherUserOutLineUI;