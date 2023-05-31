/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as S from './styles/LocationPostUIStyle';
import { useNavigate } from 'react-router-dom';

const PostDetailUI = ({ locationPost }) => {
    const navigate = useNavigate();
    let imageUrls = [];

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
        navigate(`/postDetail`, { state: { postId: locationPost.postId } });
    }

    const showOtherUser = () => {
        navigate('/otherUser', { state: { userId: locationPost.userId } });
    }

    return (
        <>
            <div css={S.feed}>
                <header css={S.header}>
                    <button css={S.profile} onClick={showOtherUser}>
                        <div css={S.profilePictureBox}>
                            <div css={S.profilePicture}></div>
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
                    <div css={S.follow}>
                        <button css={S.followButton}>팔로우</button>
                    </div>
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
                        {locationPost.content}{locationPost.evalScore}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetailUI;