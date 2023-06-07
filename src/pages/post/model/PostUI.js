/* eslint-disable jsx-a11y/alt-text */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as S from './styles/PostUIStyle';
import { AiOutlineStar } from 'react-icons/ai';
import { SlArrowRight } from 'react-icons/sl';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';
import RatingScoreUI from '../../model/RatingScoreUI';

const PostUI = ({ post, onClick }) => {
    const navigate = useNavigate();
    const rtk = Cookies.get("refreshToken");
    const userId = Cookies.get("userId");
    const [postFavState, setPostFavState] = useState(false);
    const [locationFavState, setLocationFavState] = useState(false);
    const [subState, setSubState] = useState(false);
    let imageUrls = [];

    useEffect(() => {
        const userLocFavId = post.userLocFavId;
        const userPostFavId = post.userPostFavId;
        const userSubId = post.userSubId;

        if (userLocFavId === null) {
            setLocationFavState(false);
        } else {
            setLocationFavState(true);
        }

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
    }, [post.userLocFavId, post.userPostFavId, post.userSubId]);

    let now = new Date();
    let postDate = new Date(post.updateAt);

    let formattedDate = "";
    if (now.toDateString() === postDate.toDateString()) {
        const hours = postDate.getHours().toString().padStart(2, '0');
        let ampm = hours >= 12 ? '오후' : '오전';
        const twelveHoursFormat = hours % 12 || 12;
        const minutes = postDate.getMinutes().toString().padStart(2, '0');
        formattedDate = `${ampm} ${twelveHoursFormat}:${minutes}`;
    } else {
        const year = postDate.getFullYear();
        const month = postDate.getMonth() + 1;
        const day = postDate.getDate();
        formattedDate = `${year}년 ${month}월 ${day}일`;
    }


    if (post.picDatas && post.picDatas.includes(',')) {
        imageUrls = post.picDatas.split(',');
    } else {
        imageUrls = post.picDatas ? [post.picDatas] : [];
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
        navigate(`/postDetail`, { state: { postId: post.postId } });
    }

    const showOtherUser = () => {
        if (parseInt(userId) !== parseInt(post.userId)) {
            navigate('/otherUser', { state: { userId: post.userId } });
        }
    }
    const showPlaceDetail = () => {
        navigate('/locationDetail', { state: { locId: post.locId } });
    }


    const addPostFav = useMutation(async () => {
        const data = {
            "username": Cookies.get("username"),
            "elementId": post.postId
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
            "elementId": post.userPostFavId
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

    const addLocationFav = useMutation(async () => {
        const data = {
            "username": Cookies.get("username"),
            "elementId": post.locId
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
                alert(`${post.locName}을(를) 즐겨찾기에 저장했습니다.`);
            }
        }
    });

    const undoLocationFav = useMutation(async () => {
        const data = {
            "elementId": post.userLocFavId
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
                alert(`${post.locName}을(를) 즐겨찾기에서 삭제했습니다.`);
            }
        }
    });

    const addSub = useMutation(async () => {
        const data = {
            "userId": userId,
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

    console.log(imageUrls);

    return (
        <>
            <div css={S.feed}>
                <header css={S.header}>
                    <button css={S.profile} onClick={showOtherUser}>
                        <div css={S.profilePictureBox}>
                            <div css={S.profilePicture}>
                                <img src={post.imageUrl} alt="" css={S.profilePhoto}/>
                            </div>
                        </div>
                        <div>
                            <div css={S.profileID}>{post.name}</div>
                            <div>
                                <span css={S.profileInfo}>사진리뷰 : {post.picPostCnt}</span>
                                <span css={S.placeWordConnection}>·</span>
                                <span css={S.profileInfo}>작성일자 : {formattedDate}</span>
                            </div>
                        </div>
                    </button>
                    {(rtk === undefined || parseInt(userId) === parseInt(post.userId))
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
                                    <img src={url} css={S.responsiveImage} />
                                </div> : null
                        ))}
                    </div>
                </main>
                <div>
                    <div css={S.detail}>
                        <RatingScoreUI rating={post.evalScore} />
                        <div style={{ margin: '40px 0'}}>
                            {post.content}
                        </div>
                    </div>
                </div>
                <footer>
                    <div css={S.footer} >
                        <div css={S.place} onClick={showPlaceDetail}>
                            <div css={S.placeDetail}>
                                <div>{post.locName}</div>
                                <div><SlArrowRight /></div>
                            </div>
                            <div css={S.placeDetail}>
                                <span>{post.category}</span>
                                <span css={S.placeWordConnection}> · </span>
                                <span>{post.address}</span>
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

export default PostUI;

