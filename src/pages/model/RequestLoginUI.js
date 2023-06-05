/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/RequestLoginUIStyle';

const RequestLoginUI = ({ onClick }) => {
    return (
        <>
            <div css={S.userInfoBox}>
                <div css={S.userInfo}>
                    <div css={S.userInfoLeft}>
                        <div css={S.profileBox} onClick={() => onClick('/auth/login')}></div>
                    </div>
                    <div>
                        <button css={S.requestLoginButton} onClick={() => onClick('/auth/login')}>로그인하기 </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RequestLoginUI;