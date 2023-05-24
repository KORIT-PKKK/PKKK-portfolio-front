/* eslint-disable jsx-a11y/alt-text */
/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/FavPlaceUIStyle';
import { AiOutlineStar } from 'react-icons/ai';
import { SlArrowRight } from 'react-icons/sl';
const FavPlaceUI = () => {
    return (
        <>
            <div>
                <div css={S.placeContainer}>
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
            </div>
        </>
    );
};

export default FavPlaceUI;

