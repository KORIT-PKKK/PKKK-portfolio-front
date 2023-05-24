/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/ButtonUIStyle';

const ButtonUI = ({ onClick }) => {
    return (
        <>
            <div css={S.buttonBox}>
                <button css={S.button} onClick={() => onClick('/postAddView')}>글쓰기</button>
            </div>
        </>
    );
};

export default ButtonUI;