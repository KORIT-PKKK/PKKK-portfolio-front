/* eslint-disable jsx-a11y/alt-text */
/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/UserPostUIStyle';
import { AiOutlineStar } from 'react-icons/ai';
import { SlArrowRight } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
const UserPostUI = ({ post, onClick }) => {
    const navigate = useNavigate();
    let imageUrls = [];

    let now = new Date();
    let postDate = new Date(post.updateAt);

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


    if (post.picDatas && post.picDatas.includes(',')) {
        imageUrls = post.picDatas.split(',');
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

    const showPlaceDetail = () => {
        navigate('/locationDetail', { state: { locId: post.locId } });
    }


    return (
        <>
            <div css={S.feed}>
                <div>
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
                            <button css={S.favoritesButton}>
                                <div><AiOutlineStar /></div>
                                <div css={S.favoritesDetail}>저장</div>
                            </button>
                        </div>
                    </div>
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
                        {post.content}{post.evalScore}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserPostUI;

