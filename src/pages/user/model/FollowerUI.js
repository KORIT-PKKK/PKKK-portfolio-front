/** @jsxImportSource @emotion/react */
import * as S from './styles/FollowerUIStyle';
import React from 'react';
import { BiUser } from 'react-icons/bi';

const FollowerUI = () => {
    return (
        <>
            <div css={S.container}>
                <h1 css={S.title}>나를 팔로우</h1>
                <div css={S.userBox}>
                    <div css={S.photoBox}></div>
                    <div css={S.username}>username</div>
                    <button css={S.stateButton}><BiUser/>팔로우</button>
                </div>
                <div css={S.userBox}>
                    <div css={S.photoBox}></div>
                    <div css={S.username}>username</div>
                    <button css={S.stateButton}><BiUser/>팔로우</button>
                </div>
                <div css={S.userBox}>
                    <div css={S.photoBox}></div>
                    <div css={S.username}>username</div>
                    <button css={S.stateButton}><BiUser/>팔로우</button>
                </div>
                <div css={S.userBox}>
                    <div css={S.photoBox}></div>
                    <div css={S.username}>username</div>
                    <button css={S.stateButton}><BiUser/>팔로우</button>
                </div>
            </div>
        </>
    );
};

export default FollowerUI;