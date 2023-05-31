/** @jsxImportSource @emotion/react */
import Cookies from 'js-cookie';
import * as S from './styles/UserUpdateViewStyle';
import React, { useEffect, useState } from 'react';
import { BiLeftArrow } from 'react-icons/bi';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../Controller/interceptors/TokenRefresher';
import { localURL } from '../../config/ApiURL';

const UserUpdateView = () => {
    const navigate = useNavigate();
    const [userUpdate, setUserUpdate] = useState({ name: "", imageUrl: "", introduce: "" });
    const [nicknameLength, setNicknameLength] = useState(0);
    const [introduceLength, setIntroduceLength] = useState(0);

    const menuClickHandle = (path) => {
        navigate(path);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserUpdate({ ...userUpdate, [name]: value });
        if (name === 'name') {
            setNicknameLength(value.length);
        } else if (name === 'introduce') {
            setIntroduceLength(value.length);
        }
    }

    const searchUserInfo = useQuery(["searchUserInfo"], async () => {

        const userId = Cookies.get("userId");
        const response = await axiosInstance.get(`/api/user/detail`, { params: { userId: userId } })
        return response;

    }, {
        onSuccess: (response) => {
            const userData = response.data[0];
            if (userData.name === null) {
                userData.name = "";
            }
            if (userData.introduce === null) {
                userData.introduce = "";
            }
            if (userData.imageUrl === null) {
                userData.imageUrl = "";
            }
            setUserUpdate(userData);
            setNicknameLength(userData.name.length);
            setIntroduceLength(userData.introduce.length);
        }
    });

    const updateUserInfo = useMutation(async () => {
        const data = {
            "username": Cookies.get("username"),
            "name": userUpdate.name,
            "introduce": userUpdate.introduce,
            "imageUrl": userUpdate.imageUrl
        }
        try {
            const response = await axiosInstance.post(`/api/user/detail/update`, data);
            return response;
        } catch {
            alert("업데이트 실패하였습니다.");
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                alert("업데이트 성공하였습니다.")
            }
        }
    });

    const updateUserInfoClick = () => {
        updateUserInfo.mutate()
    }

    if (searchUserInfo.isLoading) {
        <div>불러오는 중...</div>
    }

    console.log(userUpdate)

    return (
        <>
            <header css={S.header}>
                <button css={S.backButton} onClick={() => menuClickHandle('/')}><BiLeftArrow /></button>
                <h1 css={S.headerTitle}>프로필 설정</h1>
            </header>
            <div css={S.infoModifyBox}>
                <div css={S.photoBox}></div>
                <div css={S.inputLabel}>닉네임</div>
                <input
                    css={S.nickNameInput}
                    type="text"
                    name="name"
                    placeholder='한글, 영문, 숫자, 공백2~20자까지 입력할 수 있어요!'
                    value={userUpdate.name}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={20}
                />
                <div css={S.nickNameState}>
                    <div>닉네임을 입력해주세요!</div>
                    <div>{nicknameLength}/20</div>
                </div>
                <div css={S.inputLabel}>소개</div>
                <input
                    css={S.introduceInput}
                    type="text"
                    name="introduce"
                    placeholder='예) 분위기 있는 카페 찾아다녀요~'
                    value={userUpdate.introduce}
                    onChange={handleChange}
                    maxLength={150}
                />
                <div css={S.introduceState}>{introduceLength}/150</div>
            </div>
            <div css={S.saveBox}>
                <button css={S.saveButton} onClick={updateUserInfoClick}>저장하기</button>
            </div>
        </>
    );
};

export default UserUpdateView;