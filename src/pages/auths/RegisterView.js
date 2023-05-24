/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import * as S from './styles/RegisterViewStyle';
import React, { useState } from 'react';
import axios from 'axios';

const RegisterView = () => {

    const navigate = useNavigate();
    const [registerUser, setRegisterUser] = useState({ username: "", password: "", name: "" });
    // const [errorMessages, setErrorMessages] = useState({ username: "", password: "", name: "" });

    const menuClickHandle = (path) => {
        navigate(path);
    }

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setRegisterUser({ ...registerUser, [name]: value });
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
        try {
            await axios.post("http://192.168.2.18:8080/api/auth/signup", JSON.stringify(data), option);
            // setErrorMessages({ username: "", password: "", name: "" });
            alert("회원가입 성공!");
            navigate("/auth/login");
        } catch (error) {
            console.log(error.response);
            // setErrorMessages({ username: "", password: "", name: "", ...error.response.data.errorData });
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
                <div css={S.errorMessage}></div>
                <h3 css={S.inputTitle}>비밀번호</h3>
                <input type="password" css={S.input} name="password" onChange={onChangeHandle} />
                <div css={S.errorMessage}></div>
                <h3 css={S.inputTitle}>이름</h3>
                <input type="text" css={S.input} name="name" onChange={onChangeHandle} />
                <div css={S.errorMessage}></div>
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