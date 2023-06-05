import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './styles/FollowerBoxUIStyle';

const FollowerBoxUI = ({ follower }) => {

    return (
        <>
            <div css={S.userBox}>
                <div css={S.photoBox}></div>
                <div css={S.username}>{follower.name}</div>
            </div>
        </>
    );
};

export default FollowerBoxUI;