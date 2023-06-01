/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as S from './styles/PlaceUIStyle';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';

const PlaceUI = ({ postDetail }) => {
    const [locationFavState, setLocationFavState] = useState(false);
    const rtk = Cookies.get("refreshToken");
    const authState = rtk !== undefined;

    useEffect(() => {
        const userLocFavId = postDetail.userLocFavId;

        if (userLocFavId === null) {
            setLocationFavState(false);
        } else {
            setLocationFavState(true);
        }
    }, [postDetail.userLocFavId]);

    const addLocationFav = useMutation(async () => {
        const data = {
            "username": Cookies.get("username"),
            "elementId": postDetail.locId
        }
        try {
            const response = await axiosInstance.post(`/api/user/favorite/loc/add`, data);
            return response;
        } catch {
            alert("로그인 후 사용해주세요.");
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                setLocationFavState(true);
                alert(`${postDetail.locName}을(를) 즐겨찾기에 저장했습니다.`);
            }
        }
    });

    const undoLocationFav = useMutation(async () => {
        const data = {
            "elementId": postDetail.userLocFavId
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
                alert(`${postDetail.locName}을(를) 즐겨찾기에서 삭제했습니다.`);
            }
        }
    });


    return (
        <>
            <div css={S.container}>
                <div css={S.buttonBox}>
                    <button css={S.placeButtonBox}>
                        <div css={S.placeName}>{postDetail.locName}</div>
                        <div css={S.address}>
                            <div>{postDetail.category}</div>
                            <div>·</div>
                            <div>{postDetail.address}</div>
                        </div>
                    </button>
                    {(authState)
                        ?
                        <>
                            {locationFavState ?
                                <>
                                    <button css={S.placeUnSaveButton} onClick={() => { undoLocationFav.mutate() }}>
                                        <div><AiFillStar css={S.placeUnSaveIcon} /></div>
                                        <div css={S.placeUnSaveDetail}>저장</div>
                                    </button>
                                </>
                                :
                                <>
                                    <button css={S.placeSaveButton} onClick={() => { addLocationFav.mutate() }}>
                                        <div><AiOutlineStar css={S.placeSaveIcon} /></div>
                                        <div css={S.placeSaveDetail}>저장</div>
                                    </button>
                                </>
                            }
                        </>
                        : <></>
                    }
                </div>

            </div>
        </>
    );
};

export default PlaceUI;