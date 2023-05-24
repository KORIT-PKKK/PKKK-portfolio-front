/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/OtherUserViewStyle';
import LogoUI from '../model/LogoUI';
import { useLocation, useNavigate } from 'react-router-dom';
import OtherUserOutLineUI from './model/OtherUserOutLineUI';
import ButtonUI from './model/ButtonUI';
import ReviewCardUI from './model/ReviewCardUI';

const OtherUserView = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    console.log(userId)

    const navigate = useNavigate();

    const menuClickHandle = (path) => {
        navigate(path);
    }

    return (
        <>
            <LogoUI onClick={menuClickHandle} />
            <div css={S.userOutLine}>
                <OtherUserOutLineUI />
                <ButtonUI />
            </div>
            <div css={S.container}>
                <div css={S.reviewContainer}>
                    <ReviewCardUI />
                    <ReviewCardUI />
                    <ReviewCardUI />
                    <ReviewCardUI />
                </div>
            </div>
        </>
    );
};

export default OtherUserView;