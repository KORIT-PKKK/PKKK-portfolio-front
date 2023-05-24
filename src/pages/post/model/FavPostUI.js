/* eslint-disable jsx-a11y/alt-text */
/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/FavPostUIStyle.js';
import { AiOutlineStar } from 'react-icons/ai';
import { SlArrowRight } from 'react-icons/sl';
const FavPostUI = () => {
    return (
        <>
            <div css={S.feed}>
                <header css={S.header}>
                    <button css={S.profile}>
                        <div css={S.profilePictureBox}>
                            <div css={S.profilePicture}></div>
                        </div>
                        <div>
                            <div css={S.profileID}></div>
                            <div>
                                <span css={S.profileInfo}>사진리뷰</span>
                                <span css={S.profileInfo}> · </span>
                                <span css={S.profileInfo}>작성일자</span>
                            </div>
                        </div>
                    </button>
                    <div css={S.follow}>
                        <button css={S.followButton}>팔로우</button>
                    </div>
                    <div css={S.block}>
                        <button css={S.blockButton}>⁝</button>
                    </div>
                </header>
                <main>

                </main>
                <div>
                    <div css={S.detail}>
                    </div>
                </div>
                <footer>
                    <div css={S.footer}>
                        <div css={S.place}>
                            <div css={S.placeDetail}>
                                <div></div>
                                <div><SlArrowRight /></div>
                            </div>
                            <div css={S.placeDetail}>
                                <span></span>
                                <span css={S.placeWordConnection}> · </span>
                                <span></span>
                            </div>
                        </div>
                        <div css={S.favorites}>
                            <button css={S.favoritesButton}>
                                <div><AiOutlineStar /></div>
                                <div css={S.favoritesDetail}>저장</div>
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default FavPostUI;

