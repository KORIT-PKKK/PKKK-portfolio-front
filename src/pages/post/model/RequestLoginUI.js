/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/RequestLoginUIStyle';
import { AiFillFlag } from 'react-icons/ai';

const RequestLoginUI = ({ onClick }) => {
    return (
        <>
            <div css={S.requestLoginContainer}>
                <div css={S.requestLoginBox}>
                    <AiFillFlag css={S.flagIcon} />
                    <div css={S.announcement}>본인만의 플레이스를 작성해보아요!</div>
                    <div css={S.announcement}>나만의 타임라인~</div>
                    <div css={S.loginMessage}> 지금 빨리 로그인 후 나만의 플레이스를 만들어보아요~</div>
                    <div css={S.loginPhotoBox}></div>
                    <div css={S.loginButtonBox}>
                        <button css={S.loginButton} onClick={() => onClick('/auth/login')}> 플레이스 만들기</button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default RequestLoginUI;