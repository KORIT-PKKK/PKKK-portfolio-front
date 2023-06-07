/* eslint-disable jsx-a11y/alt-text */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as S from './styles/UserPostUIStyle';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { SlArrowRight } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';
import RatingScoreUI from '../../model/RatingScoreUI';

const UserPostUI = ({ post, onClick }) => {
    const navigate = useNavigate();
    let imageUrls = [];
    const rtk = Cookies.get("refreshToken");
    const authState = rtk !== undefined;
    const [locationFavState, setLocationFavState] = useState(false);

    useEffect(() => {
        const userLocFavId = post.userLocFavId;

        if (userLocFavId === null) {
            setLocationFavState(false);
        } else {
            setLocationFavState(true);
        }
    }, [post.userLocFavId]);

    let now = new Date();
    let postDate = new Date(post.updateAt);

    console.log(post)

    let formattedDate = "";
    if (now.toDateString() === postDate.toDateString()) {
        const hours = postDate.getHours().toString().padStart(2, '0');
        let ampm = hours >= 12 ? '오후' : '오전';
        const twelveHoursFormat = hours % 12 || 12;
        const minutes = postDate.getMinutes().toString().padStart(2, '0');
        formattedDate = `오늘, ${ampm} ${twelveHoursFormat}:${minutes}`;
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



    const showPostDetail = () => {
        navigate(`/postDetail`, { state: { postId: post.postId } });
    }

    const showPlaceDetail = () => {
        navigate('/locationDetail', { state: { locId: post.locId } });
    }


    return (
        <>
            <div css={S.feed}>
                <div css={S.date}>
                    <div css={S.border}>{formattedDate}</div> 
                </div>
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
                    <div css={S.placeContainer}>
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
                            {(authState)
                                ?
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
                                : <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserPostUI;

