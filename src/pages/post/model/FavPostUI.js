/* eslint-disable jsx-a11y/alt-text */
/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/FavPostUIStyle.js';
import { AiOutlineStar } from 'react-icons/ai';
import { SlArrowRight } from 'react-icons/sl';
import { AiFillStar } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher.js';
import RatingScoreUI from '../../model/RatingScoreUI.js';
const FavPostUI = ({ favPost }) => {
    const navigate = useNavigate();
    const rtk = Cookies.get("refreshToken");
    const userId = Cookies.get("userId");
    const [locationFavState, setLocationFavState] = useState(false);
    const [subState, setSubState] = useState(false);
    let imageUrls = [];
    console.log(favPost)

    useEffect(() => {
        const userLocFavId = favPost.userLocFavId;
        const userSubId = favPost.userSubId;

        if (userLocFavId === null) {
            setLocationFavState(false);
        } else {
            setLocationFavState(true);
        }

        if (userSubId === null) {
            setSubState(false);
        } else {
            setSubState(true);
        }
    }, [favPost.userLocFavId, favPost.userSubId]);

    let now = new Date();
    let favPostDate = new Date(favPost.updateAt);

    let formattedDate = "";
    if (now.toDateString() === favPostDate.toDateString()) {
        const hours = favPostDate.getHours();
        let ampm = hours >= 12 ? '오후' : '오전';
        const twelveHoursFormat = hours % 12 || 12;
        const minutes = favPostDate.getMinutes();
        formattedDate = `${ampm} ${twelveHoursFormat}:${minutes}`;
    } else {
        const year = favPostDate.getFullYear();
        const month = favPostDate.getMonth() + 1;
        const day = favPostDate.getDate();
        formattedDate = `${year}년 ${month}월 ${day}일`;
    }


    if (favPost.picDatas && favPost.picDatas.includes(',')) {
        imageUrls = favPost.picDatas.split(',');
    } else {
        imageUrls = favPost.picDatas ? [favPost.picDatas] : [];
    }

    const getStyles = (imageUrls) => {
        const length = imageUrls.length;
        const map = {
            0: S.blankWrapper,
            1: S.wrapper1,
            2: S.wrapper2,
            3: S.wrapper3
        }

        return map[length] ?? S.wrapper3;
    }

    const getIndexCss = (index) => {
        const map = {
            0: S.box1,
            1: S.box2,
            2: S.box3
        }

        return map[index] ?? null;
    }

    const mainSetting = (length) => {
        const map = {
            0: S.blank,
            1: S.main
        }

        return map[length] ?? S.main;
    }

    const showPostDetail = () => {
        navigate(`/postDetail`, { state: { postId: favPost.postId } });
    }

    const showOtherUser = () => {
        navigate('/otherUser', { state: { userId: favPost.userId } });
    }

    const showPlaceDetail = () => {
        navigate('/locationDetail', { state: { locId: favPost.locId } });
    }

    const undoPostFav = useMutation(async () => {
        const data = {
            "elementId": favPost.userPostFavId
        }
        try {
            const response = await axiosInstance.delete(`/api/user/favorite/post/undo`, { data: data });
            return response;
        } catch {
            alert("로그인 후 사용해주세요.");
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                alert(`즐겨찾기에서 삭제했습니다.`);
            }
        }
    });

    const addLocationFav = useMutation(async () => {
        const data = {
            "username": Cookies.get("username"),
            "elementId": favPost.locId
        }
        try {
            const response = await axiosInstance.post(`/api/user/favorite/loc/add`, data);
            return response;
        } catch {
            alert("로그인 후 사용해주세요.");
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                setLocationFavState(true);
                alert(`${favPost.locName}을(를) 즐겨찾기에 저장했습니다.`);
            }
        }
    });

    const undoLocationFav = useMutation(async () => {
        const data = {
            "elementId": favPost.userLocFavId
        }
        try {
            const response = await axiosInstance.delete(`/api/user/favorite/loc/undo`, { data: data });
            return response;
        } catch {
            alert("로그인 후 사용해주세요.");
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                setLocationFavState(false);
                alert(`${favPost.locName}을(를) 즐겨찾기에서 삭제했습니다.`);
            }
        }
    });

    const addSub = useMutation(async () => {
        const data = {
            "userId": userId,
            "subUserId": favPost.userId
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
                alert(`${favPost.name}님을 팔로우 합니다.`);
            }
        }
    });

    const unSub = useMutation(async () => {
        const data = {
            "elementId": favPost.userSubId
        }
        const formData = new FormData();
        formData.append("elementId", favPost.userSubId);
        try {
            const response = await axiosInstance.delete(`/api/user/subscribe/unSub`, { data: data });
            return response;
        } catch {
            alert("로그인 후 사용해주세요!");
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                setSubState(false);
                alert(`${favPost.name}님을 언팔로우 했습니다.`);
            }
        }
    });

    return (
        <>
            <div css={S.feed}>
                <header css={S.header}>
                    <button css={S.profile} onClick={showOtherUser}>
                        <div css={S.profilePictureBox}>
                            <div css={S.profilePicture}>
                                <img src={favPost.imageUrl} alt="" css={S.profilePhoto} />
                            </div>
                        </div>
                        <div>
                            <div css={S.profileID}>{favPost.name}</div>
                            <div>
                                <span css={S.profileInfo}>사진리뷰 : {favPost.picPostCnt}</span>
                                <span css={S.placeWordConnection}>·</span>
                                <span css={S.profileInfo}>작성일자 : {formattedDate}</span>
                            </div>
                        </div>
                    </button>
                    {(rtk === undefined || parseInt(userId) === parseInt(favPost.userId))
                        ? (<></>)
                        : (<>
                            {subState ?
                                <>
                                    <div css={S.unFollow}>
                                        <button css={S.unFollowButton} onClick={() => { unSub.mutate() }}>언팔로우</button>
                                    </div>
                                </>
                                :
                                <>
                                    <div css={S.follow}>
                                        <button css={S.followButton} onClick={() => { addSub.mutate() }}>팔로우</button>
                                    </div>
                                </>
                            }
                            <div css={S.postUnSaveButton} onClick={() => { undoPostFav.mutate() }}>
                                <div><GiCancel css={S.saveUnIcon} /></div>
                                <div css={S.postUnSave}>삭제</div>
                            </div>
                        </>)
                    }
                </header>
                <main css={mainSetting(imageUrls.length)} onClick={showPostDetail}>
                    <div css={getStyles(imageUrls)}>
                        {imageUrls.map((url, index) => (
                            index < 3 ?
                                <div key={index} css={getIndexCss(index)}>
                                    <img src={url} css={S.responsiveImage} />
                                </div> : null
                        ))}
                    </div>
                </main>
                <div>
                    <div css={S.detail}>
                        <RatingScoreUI rating={favPost.evalScore} />
                        <div style={{ margin: '40px 0'}}>
                                {favPost.content}
                        </div>
                    </div>
                </div>
                <footer>
                    <div css={S.footer} >
                        <div css={S.place} onClick={showPlaceDetail}>
                            <div css={S.placeDetail}>
                                <div>{favPost.locName}</div>
                                <div><SlArrowRight /></div>
                            </div>
                            <div css={S.placeDetail}>
                                <span>{favPost.category}</span>
                                <span css={S.placeWordConnection}> · </span>
                                <span>{favPost.address}</span>
                            </div>
                        </div>
                        <div css={S.favorites}>
                            {(rtk === undefined)
                                ? <></>
                                :
                                <>
                                    {locationFavState ?
                                        <>
                                            <button css={S.placeUnSaveButton} onClick={() => { undoLocationFav.mutate() }}>
                                                <div><AiFillStar css={S.placeUnSaveIcon} /></div>
                                                <div css={S.placeUnSaveDetail}>저장</div>
                                            </button>
                                        </>
                                        :
                                        <>
                                            <button css={S.placeSaveButton} onClick={() => { addLocationFav.mutate() }}>
                                                <div><AiOutlineStar css={S.placeSaveIcon} /></div>
                                                <div css={S.placeSaveDetail}>저장</div>
                                            </button>
                                        </>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default FavPostUI;

