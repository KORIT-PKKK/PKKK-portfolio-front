/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as S from './styles/PlaceUIStyle';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';
import RatingScoreUI from '../../model/RatingScoreUI';

const PlaceUI = ({ locDetail }) => {
    const rtk = Cookies.get("refreshToken");
    const authState = rtk !== undefined;
    const [locationFavState, setLocationFavState] = useState(false);

    useEffect(() => {
        const userLocFavId = locDetail.userLocFavId;

        if (userLocFavId === null) {
            setLocationFavState(false);
        } else {
            setLocationFavState(true);
        }
    }, [locDetail.userLocFavId]);

    const addLocationFav = useMutation(async () => {
        const data = {
            "username": Cookies.get("username"),
            "elementId": locDetail.locId
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
                alert(`${locDetail.locName}을(를) 즐겨찾기에 저장했습니다.`);
            }
        }
    });

    const undoLocationFav = useMutation(async () => {
        const data = {
            "elementId": locDetail.userLocFavId
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
                alert(`${locDetail.locName}을(를) 즐겨찾기에서 삭제했습니다.`);
            }
        }
    });

    console.log(locDetail)

    return (
        <>
            <div css={S.container}>
                <div css={S.buttonBox}>
                    <button css={S.placeButtonBox}>
                        <div css={S.placeName}>{locDetail.locName}</div>
                        <div css={S.address}>
                            <div>{locDetail.category}</div>
                            <div css={S.wordConnection}>·</div>
                            <div>{locDetail.address}</div>
                        </div>
                    </button>
                    {authState ? (
                        locationFavState ? (
                            <button onClick={() => undoLocationFav.mutate()} css={S.unSaveButtonBox}>
                                <AiFillStar css={S.unSaveIcon} />
                                <div css={S.unSave}>저장</div>
                            </button>
                        ) : (
                            <button onClick={() => addLocationFav.mutate()} css={S.saveButtonBox}>
                                <AiOutlineStar css={S.saveIcon} />
                                <div css={S.save}>저장</div>
                            </button>
                        )
                    ) : <></>}

                </div>
                {(locDetail.evalScore === null) ?
                    <>
                        <div css={S.locationDetailContainer}>
                            <div css={S.score}>아직 평점이 없어요.</div>
                        </div>
                    </>
                    :
                    <>
                        <div css={S.locationDetailContainer}>
                            <div css={S.score}><RatingScoreUI rating={locDetail.evalScore}/></div>
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default PlaceUI;