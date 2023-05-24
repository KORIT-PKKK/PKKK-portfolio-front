/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/ReviewCardUIStyle';

const ReviewCardUI = () => {
    return (
        <>
            <div css={S.reviewCard}>
                <div css={S.placeContainer}>
                    <div css={S.address}>부산시 서동</div>
                    <div css={S.place}>스튜디오</div>
                </div>
            </div>
        </>
    );
};

export default ReviewCardUI;