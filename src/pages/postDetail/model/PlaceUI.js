/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/PlaceUIStyle';
import { AiOutlineStar } from 'react-icons/ai';

const PlaceUI = ({ postDetail }) => {
    console.log(postDetail.userId);

    return (
        <>
            <div css={S.container}>
                <div css={S.buttonBox}>
                    <button css={S.placeButtonBox}>
                        <div css={S.placeName}>{postDetail.locName}</div>
                        <div css={S.address}>
                            <div>{postDetail.category}</div>
                            <div>·</div>
                            <div>{postDetail.address}</div>
                        </div>
                    </button>
                    <button css={S.saveButtonBox}>
                        <AiOutlineStar css={S.saveIcon} />
                        <div>저장</div>
                    </button>
                </div>

            </div>
        </>
    );
};

export default PlaceUI;