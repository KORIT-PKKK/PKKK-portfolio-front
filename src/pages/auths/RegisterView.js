/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import * as S from './styles/RegisterViewStyle';
import React, { useState } from 'react';
import axios from 'axios';
import { localURL } from '../../config/ApiURL';

const RegisterView = () => {

    const navigate = useNavigate();
    const [registerUser, setRegisterUser] = useState({ username: "", password: "", name: "" });
    const [errorMessages, setErrorMessages] = useState({ username: "", password: "", name: "" });

    const menuClickHandle = (path) => {
        navigate(path);
    }

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setRegisterUser({ ...registerUser, [name]: value });
        setErrorMessages({ ...errorMessages, [name]: "" });
    }

    const registeSubmit = async () => {
        const data = {
            ...registerUser
        }
        const option = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        // 필드 유효성 확인
        let errors = { username: "", password: "", name: "" };

        if (data.username === "") {
            errors.username = "아이디를 입력해주세요.";
        } else if (!/^[a-z0-9]+$/.test(data.username) || data.username.length < 4 || data.username.length > 10) {
            errors.username = "아이디는 4자 이상 10자 이하의 소문자 영어와 숫자로 입력해주세요.";
        }

        if (data.password === "") {
            errors.password = "비밀번호를 입력해주세요.";
        } else if (!/^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{8,16}$/.test(data.password)) {
            errors.password = "비밀번호는 8자 이상 16자 이하의 소문자 영어와 숫자의 조합으로 입력해주세요.";
        }

        if (data.name === "") {
            errors.name = "이름을 입력해주세요.";
        } else if (!/^[\u3131-\uD79D]{2,5}$/.test(data.name)) {
            errors.name = "이름은 2자 이상 5자 이하의 한글로 입력해주세요.";
        }

        setErrorMessages(errors);

        if (Object.values(errors).every((error) => error === "")) {
            try {
                await axios.post(`${localURL}/api/auth/signup`, JSON.stringify(data), option);
                alert("회원가입 성공!");
                navigate("/auth/login");
            } catch (error) {
                console.log(error.response);
            }
        }
    }

    return (
        <>
            <header css={S.header}>
                <div css={S.compony}>PKKK 플레이스</div>
            </header>
            <div css={S.inputBox}>
                <h3 css={S.inputTitle}>아이디</h3>
                <input type="text" css={S.input} name="username" onChange={onChangeHandle} />
                <div css={S.errorMessage}>{errorMessages.username}</div>
                <h3 css={S.inputTitle}>비밀번호</h3>
                <input type="password" css={S.input} name="password" onChange={onChangeHandle} />
                <div css={S.errorMessage}>{errorMessages.password}</div>
                <h3 css={S.inputTitle}>이름</h3>
                <input type="text" css={S.input} name="name" onChange={onChangeHandle} />
                <div css={S.errorMessage}>{errorMessages.name}</div>
            </div>
            <div css={S.joinButtonBox}>
                <button css={S.joinButton} onClick={registeSubmit}>가입하기</button>
            </div>
            <div css={S.footer}>
                <div css={S.componyIcon} onClick={() => menuClickHandle('/')}>PKKK플레이스</div>
            </div>
        </>
    );
};

export default RegisterView;