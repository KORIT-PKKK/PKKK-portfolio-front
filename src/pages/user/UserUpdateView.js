/** @jsxImportSource @emotion/react */
import * as S from './styles/UserUpdateViewStyle';
import React from 'react';
import { BiLeftArrow } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const UserUpdateView = () => {
    const navigate = useNavigate();

    const menuClickHandle = (path) => {
        navigate(path);
    }

    return (
        <>
            <header css={S.header}>
                <button css={S.backButton} onClick={() => menuClickHandle('/')}><BiLeftArrow /></button>
                <h1 css={S.headerTitle}>프로필 설정</h1>
            </header>
            <div css={S.infoModifyBox}>
                <div css={S.photoBox}></div>
                <div css={S.inputLabel}>닉네임</div>
                <input css={S.nickNameInput} type="text" placeholder='한글, 영문, 숫자, 공백2~20자까지 입력할 수 있어요!' />
                <div css={S.nickNameState}>
                    <div>닉네임을 입력해주세요!</div>
                    <div>0/20</div>
                </div>
                <div css={S.inputLabel}>소개</div>
                <input css={S.introduceInput} type="text" placeholder='예) 분위기 있는 카페 찾아다녀요~' />
                <div css={S.introduceState}>0/150</div>
            </div>
            <div css={S.saveBox}>
                <button css={S.saveButton}>저장하기</button>
            </div>
        </>
    );
};

export default UserUpdateView;