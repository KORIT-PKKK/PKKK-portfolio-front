/** @jsxImportSource @emotion/react */
import * as S from './styles/FollowingUIStyle';
import React from 'react';
import { BiUser } from 'react-icons/bi';

const FollowingUI = () => {
    return (
        <>
            <div css={S.container}>
                <h1 css={S.title}>나의 팔로우</h1>
                <div css={S.userBox}>
                    <div css={S.photoBox}></div>
                    <div css={S.username}>username</div>
                    <button css={S.stateButton}>X 팔로우 취소</button>
                </div>
                <div css={S.userBox}>
                    <div css={S.photoBox}></div>
                    <div css={S.username}>username</div>
                    <button css={S.stateButton}>X 팔로우 취소</button>
                </div>
                <div css={S.userBox}>
                    <div css={S.photoBox}></div>
                    <div css={S.username}>username</div>
                    <button css={S.stateButton}>X 팔로우 취소</button>
                </div>
                <div css={S.userBox}>
                    <div css={S.photoBox}></div>
                    <div css={S.username}>username</div>
                    <button css={S.stateButton}>X 팔로우 취소</button>
                </div>
            </div>
        </>
    );
};

export default FollowingUI;