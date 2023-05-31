/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/HeaderUIStyle';
import { BiLeftArrow } from 'react-icons/bi';

const HeaderUI = ({ onClick }) => {
    return (
        <>
            <div css={S.header} onClick={() => onClick('/')}>
                <button css={S.backButton}><BiLeftArrow /></button>
            </div>
        </>
    );
};

export default HeaderUI;