/** @jsxImportSource @emotion/react */
import React from 'react';
import { BiMenu } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import * as S from './styles/LogoUIStyle';

const LogoUI = ({ onClick }) => {
    return (
        <>
            <div css={S.logoBox}>
                <div>
                    <button css={S.logo} onClick={() => onClick('/')}><HiHome /></button>
                    <button css={S.pageName} onClick={() => onClick('/')}>PKKK플레이스</button>
                </div>
                <div>
                    <button css={S.menuButton} onClick={() => onClick('/userSetting')}><BiMenu /></button>
                </div>
            </div>
        </>
    );
};

export default LogoUI;