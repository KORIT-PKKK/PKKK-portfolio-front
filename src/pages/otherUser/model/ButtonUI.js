/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as S from './styles/ButtonUIStyle';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';

const ButtonUI = ({}) => {

    return (
        <>
            <div css={S.buttonBox}>
                <button css={S.button}>팔로우</button>
            </div>
        </>
    );
};

export default ButtonUI;