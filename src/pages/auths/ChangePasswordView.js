import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './styles/ChangePasswordViewStyle';
import { useState } from 'react';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../Controller/interceptors/TokenRefresher';
import { useNavigate } from 'react-router-dom';

const ChangePasswordView = () => {
    const navigate = useNavigate();
    const [changePassword, setChangePassword] = useState({ oldPassword: "", newPassword: "" });
    const [errorMessages, setErrorMessages] = useState({ oldPassword: "", newPassword: "" });

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setChangePassword({ ...changePassword, [name]: value });
    }

    const changePasswordSubmit = useMutation(async () => {
        const data = {
            "username": Cookies.get("username"),
            "oldPassword": changePassword.oldPassword,
            "newPassword": changePassword.newPassword
        }
        try {
            const response = await axiosInstance.post(`/api/user/password/change`, data);
            navigate("/");
            alert("비밀번호 변경이 완료 되었습니다!")
            return response;
        } catch {
            alert("기존 비밀번호가 잘못입력되었습니다!")
        }
    })

    const homeClickHandle = () => {
        navigate("/");
    }

    const changePasswordClickHandle = () => {
        const { oldPassword, newPassword } = changePassword;
        if (oldPassword === newPassword) {
            setErrorMessages({ ...errorMessages, newPassword: "새로운 비밀번호는 기존 비밀번호와 달라야 합니다." });
        } else if (newPassword.length < 8 || newPassword.length > 16) {
            setErrorMessages({ ...errorMessages, newPassword: "비밀번호는 8자 이상 16자 이하로 입력해야 합니다." });
        } else if (!/^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/.test(newPassword)) {
            setErrorMessages({ ...errorMessages, newPassword: "비밀번호는 소문자 영어와 숫자의 조합으로 입력해야 합니다." });
        } else {
            setErrorMessages({ ...errorMessages, newPassword: "" });
            changePasswordSubmit.mutate();
        }
    };

    return (
        <>
            <header css={S.header}>
                <div css={S.compony}>비밀번호 변경하기</div>
            </header>
            <div css={S.inputBox}>
                <h3 css={S.inputTitle}>현재 비밀번호</h3>
                <input type="password" css={S.input} name="oldPassword" onChange={onChangeHandle} />
                <h3 css={S.inputTitle}>새로운 비밀번호</h3>
                <input type="password" css={S.input} name="newPassword" onChange={onChangeHandle} />
                <div css={S.errorMessage}>{errorMessages.newPassword}</div>
            </div>
            <div css={S.joinButtonBox}>
                <button css={S.joinButton} onClick={changePasswordClickHandle}>비밀번호 변경하기</button>
            </div>
            <div css={S.footer}>
                <div css={S.componyIcon} onClick={homeClickHandle}>PKKK플레이스</div>
            </div>
        </>
    );
};

export default ChangePasswordView;