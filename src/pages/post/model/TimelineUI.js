/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/TimelineUIStyle';
import { AiOutlineStar } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

const TimelineUI = () => {

    return (
        <>
            <div css={S.container}>
                <div css={S.month}>5월 방문</div>
                <div css={S.reviewContainer}>
                    <div css={S.reviewCard}>
                        <div css={S.review}>꼭 방문하고 싶네요~! 다음에는 쿠폰을 챙겨가야 겠어요 하하하하하하 </div>
                        <div css={S.placeContainer}>
                            <div css={S.address}>부산시 서동</div>
                            <div css={S.place}>스튜디오</div>
                        </div>
                    </div>
                    <div css={S.reviewCard}>
                        <div css={S.review}>아주 맛있고 좋았어요!</div>
                        <div css={S.placeContainer}>
                            <div css={S.address}>부산시 서동</div>
                            <div css={S.place}>스튜디오 PKKK</div>
                        </div>
                    </div>
                    <div css={S.reviewCard}>
                        <div css={S.review}>아주 맛있고 좋았어요!</div>
                        <div css={S.placeContainer}>
                            <div css={S.address}>부산시 서동</div>
                            <div css={S.place}>스튜디오 PKKK</div>
                        </div>
                    </div>
                    <div css={S.reviewCard}>
                        <div css={S.review}>아주 맛있고 좋았어요!</div>
                        <div css={S.placeContainer}>
                            <div css={S.address}>부산시 서동</div>
                            <div css={S.place}>스튜디오 PKKK</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TimelineUI;