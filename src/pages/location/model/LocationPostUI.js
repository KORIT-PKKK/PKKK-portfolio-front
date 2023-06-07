/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as S from './styles/LocationPostUIStyle';
import { useNavigate } from 'react-router-dom';
import RatingScoreUI from '../../model/RatingScoreUI';
import Cookies from 'js-cookie';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';

const PostDetailUI = ({ locationPost }) => {
    const navigate = useNavigate();
    let imageUrls = [];
    const rtk = Cookies.get("refreshToken");
    const authState = rtk !== undefined;
    const [postFavState, setPostFavState] = useState(false);
    const [subState, setSubState] = useState(false);

    useEffect(() => {
        const userPostFavId = locationPost.userPostFavId;
        const userSubId = locationPost.userSubId;

        if (userPostFavId === null) {
            setPostFavState(false);
        } else {
            setPostFavState(true);
        }

        if (userSubId === null) {
            setSubState(false);
        } else {
            setSubState(true);
        }
    }, [locationPost.userPostFavId, locationPost.userSubId]);

    let now = new Date();
    let postDate = new Date(locationPost.updateAt);

    let formattedDate = "";
    if (now.toDateString() === postDate.toDateString()) {
        const hours = postDate.getHours();
        let ampm = hours >= 12 ? '오후' : '오전';
        const twelveHoursFormat = hours % 12 || 12;
        const minutes = postDate.getMinutes();
        formattedDate = `${ampm} ${twelveHoursFormat}:${minutes}`;
    } else {
        const year = postDate.getFullYear();
        const month = postDate.getMonth() + 1;
        const day = postDate.getDate();
        formattedDate = `${year}년 ${month}월 ${day}일`;
    }


    if (locationPost.picDatas && locationPost.picDatas.includes(',')) {
        imageUrls = locationPost.picDatas.split(',');
    } else {
        imageUrls = locationPost.picDatas ? [locationPost.picDatas] : [];
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

    const addPostFav = useMutation(async () => {
        const data = {
            "username": Cookies.get("username"),
            "elementId": locationPost.postId
        }
        try {
            const response = await axiosInstance.post(`/api/user/favorite/post/add`, data);
            return response;
        } catch {
            alert("로그인 후 사용해주세요.");
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                setPostFavState(true);
                alert(`즐겨찾기에서 저장했습니다.`);
            }
        }
    });

    const undoPostFav = useMutation(async () => {
        const data = {
            "elementId": locationPost.userPostFavId
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
                setPostFavState(false);
                alert(`즐겨찾기에서 삭제했습니다.`);
            }
        }
    });

    const addSub = useMutation(async () => {
        const data = {
            "userId": Cookies.get("userId"),
            "subUserId": locationPost.userId
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
                alert(`${locationPost.name}님을 팔로우 합니다.`);
            }
        }
    });

    const unSub = useMutation(async () => {
        const data = {
            "elementId": locationPost.userSubId
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
                alert(`${locationPost.name}님을 언팔로우 했습니다.`);
            }
        }
    });

    const showPostDetail = () => {
        navigate(`/postDetail`, { state: { postId: locationPost.postId } });
    }

    const showOtherUser = () => {
        if (parseInt(Cookies.get("userId")) !== parseInt(locationPost.userId)) {
            navigate('/otherUser', { state: { userId: locationPost.userId } });
        }
    }

    return (
        <>
            <div css={S.feed}>
                <header css={S.header}>
                    <button css={S.profile} onClick={showOtherUser}>
                        <div css={S.profilePictureBox}>
                            <div css={S.profilePicture}>
                                <img src={locationPost.imageUrl} alt="" css={S.profilePhoto} />
                            </div>
                        </div>
                        <div>
                            <div css={S.profileID}>{locationPost.name}</div>
                            <div>
                                <span css={S.profileInfo}>사진리뷰 : {locationPost.picPostCnt}</span>
                                <span css={S.placeWordConnection}>·</span>
                                <span css={S.profileInfo}>작성일자 : {formattedDate}</span>
                            </div>
                        </div>
                    </button>
                    {(!authState || parseInt(Cookies.get("userId")) === parseInt(locationPost.userId))
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

                            {postFavState ?
                                <>
                                    <div css={S.postUnSaveButton} onClick={() => { undoPostFav.mutate() }}>
                                        <div><AiFillStar css={S.saveUnIcon} /></div>
                                        <div css={S.postUnSave}>저장</div>
                                    </div>
                                </>
                                :
                                <>
                                    <div css={S.postSaveButton} onClick={() => { addPostFav.mutate() }}>
                                        <div><AiOutlineStar css={S.saveIcon} /></div>
                                        <div css={S.postSave}>저장</div>
                                    </div>
                                </>
                            }
                        </>)
                    }
                </header>
                <main css={mainSetting(imageUrls.length)} onClick={showPostDetail}>
                    <div css={getStyles(imageUrls)}>
                        {imageUrls.map((url, index) => (
                            index < 3 ?
                                <div key={index} css={getIndexCss(index)}>
                                    <img src={url} alt="" css={S.responsiveImage} />
                                </div> : null
                        ))}
                    </div>
                </main>
                <div>
                    <div css={S.detail}>
                        <RatingScoreUI rating={locationPost.evalScore} />
                        <div style={{ margin: '40px 0'}}>
                            {locationPost.content}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetailUI;