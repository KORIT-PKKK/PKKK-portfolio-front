/* eslint-disable jsx-a11y/alt-text */
/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/FavPlaceUIStyle';
import { AiOutlineStar } from 'react-icons/ai';
import { SlArrowRight } from 'react-icons/sl';
import { GiCancel } from 'react-icons/gi';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';
const FavPlaceUI = ({ favPlace }) => {
    const [locationFavState, setLocationFavState] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userLocFavId = favPlace.userLocFavId;

        if (userLocFavId === null) {
            setLocationFavState(false);
        } else {
            setLocationFavState(true);
        }
    }, [favPlace.userLocFavId]);

    const showPlaceDetail = () => {
        navigate('/locationDetail', { state: { locId: favPlace.locId } });
    }

    const undoLocationFav = useMutation(async () => {
        const data = {
            "elementId": favPlace.userLocFavId
        }
        try {
            const response = await axiosInstance.delete(`/api/user/favorite/loc/undo`, { data: data });
            return response;
        } catch {
            alert("로그인 후 사용해주세요.");
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                setLocationFavState(false);
                alert(`${favPlace.locName}을(를) 즐겨찾기에서 삭제했습니다.`);
            }
        }
    });

    return (
        <>
            <div>
                <div css={S.placeContainer}>
                    <div css={S.place} onClick={showPlaceDetail}>
                        <div css={S.placeDetail}>
                            <div>{favPlace.locName}</div>
                            <div><SlArrowRight /></div>
                        </div>
                        <div css={S.placeDetail}>
                            <span>{favPlace.category}</span>
                            <span css={S.placeWordConnection}> · </span>
                            <span>{favPlace.address}</span>
                        </div>
                    </div>
                    <div css={S.favorites}>
                        <button css={S.placeUnSaveButton} onClick={() => { undoLocationFav.mutate() }}>
                            <div><GiCancel css={S.placeUnSaveIcon} /></div>
                            <div css={S.placeUnSaveDetail}>삭제</div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FavPlaceUI;

