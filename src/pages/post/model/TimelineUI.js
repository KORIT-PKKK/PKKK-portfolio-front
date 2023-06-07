/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/TimelineUIStyle';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { SlArrowRight } from 'react-icons/sl';
import { useState } from 'react';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';
import { BsFillTrashFill } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteObject, ref } from 'firebase/storage';
import storage from '../../../Firebase';
import RatingScoreUI from '../../model/RatingScoreUI';

const TimelineUI = ({ timeLine }) => {
    console.log(timeLine);
    const navigate = useNavigate();
    let now = new Date();
    let imageUrls = [];
    let timeLineDate = new Date(timeLine.updateAt);
    const [locationFavState, setLocationFavState] = useState(false);

    useEffect(() => {
        const userLocFavId = timeLine.userLocFavId;

        if (userLocFavId === null) {
            setLocationFavState(false);
        } else {
            setLocationFavState(true);
        }
    }, [timeLine.userLocFavId]);

    let formattedDate = "";
    if (now.toDateString() === timeLineDate.toDateString()) {
        const hours = timeLineDate.getHours();
        let ampm = hours >= 12 ? '오후' : '오전';
        const twelveHoursFormat = hours % 12 || 12;
        const minutes = timeLineDate.getMinutes();
        formattedDate = `${ampm} ${twelveHoursFormat}:${minutes}`;
    } else {
        const year = timeLineDate.getFullYear();
        const month = timeLineDate.getMonth() + 1;
        const day = timeLineDate.getDate();
        formattedDate = `${year}년 ${month}월 ${day}일`;
    }


    if (timeLine.picDatas && timeLine.picDatas.includes(',')) {
        imageUrls = timeLine.picDatas.split(',');
    } else {
        imageUrls = timeLine.picDatas ? [timeLine.picDatas] : [];
    }

    const getStyles = (imageUrls) => {
        const length = imageUrls.length;
        const map = {
            0: S.blankWrapper,
            1: S.wrapper1,
            2: S.wrapper2,
            3: S.wrapper3
        }

        return map[length] ?? S.wrapper3;
    }

    const getIndexCss = (index) => {
        const map = {
            0: S.box1,
            1: S.box2,
            2: S.box3
        }

        return map[index] ?? null;
    }

    const mainSetting = (length) => {
        const map = {
            0: S.blank,
            1: S.main
        }

        return map[length] ?? S.main;
    }

    const addLocationFav = useMutation(async () => {
        const data = {
            "username": Cookies.get("username"),
            "elementId": timeLine.locId
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
                alert(`${timeLine.locName}을(를) 즐겨찾기에 저장했습니다.`);
            }
        }
    });

    const undoLocationFav = useMutation(async () => {
        const data = {
            "elementId": timeLine.userLocFavId
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
                alert(`${timeLine.locName}을(를) 즐겨찾기에서 삭제했습니다.`);
            }
        }
    });

    function postDelete(postId) {
        deletePost(postId).then(() => {
            deleteFiles();
            alert("게시글이 삭제되었습니다.");
            navigate("/timeLine")
        });
    }

    const deletePost = async (postId) => {
        const data = {
            "postId": postId,
            "username": Cookies.get("username")
        }
        try {
            const response = await axiosInstance.delete(`/api/post/delete`, { data: data });
            return response;
        } catch {
            alert("로그인 후 사용해주세요.");
            return;
        }
    }

    const deleteFiles = async () => {
        for (const url of imageUrls) {
            const path = decodeURIComponent(url.split("?")[0].split("/o/")[1]);

            const fileRef = ref(storage, path);
            try {
                await deleteObject(fileRef);
                console.log(`파일 삭제 성공: ${url}`);
            } catch (error) {
                console.log(`파일 삭제 실패: ${url}`, error);
            }
        }
    };

    const showPostDetail = () => {
        navigate(`/postDetail`, { state: { postId: timeLine.postId } });
    }

    const showPlaceDetail = () => {
        navigate('/locationDetail', { state: { locId: timeLine.locId } });
    }

    const deleteSubmitHandle = () => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");

        if (confirmDelete) {
            postDelete(timeLine.postId);
        }
    }

    const modifyButtonHandle = () => {
        navigate('/postUpdateView', { state: { postId: timeLine.postId } });
    }

    return (
        <>
            <div css={S.feed}>
                <header css={S.header}>
                    <div css={S.date}>{formattedDate}</div>
                    <div css={S.iconContainer}>
                        <BsPencilSquare css={S.icon} onClick={modifyButtonHandle} />
                        <BsFillTrashFill css={S.icon} onClick={deleteSubmitHandle} />
                    </div>
                </header >
                <main css={mainSetting(imageUrls.length)} onClick={showPostDetail}>
                    <div css={getStyles(imageUrls)}>
                        {imageUrls.map((url, index) => (
                            index < 3 ?
                                <div key={index} css={getIndexCss(index)}>
                                    <img src={url} alt='' css={S.responsiveImage} />
                                </div> : null
                        ))}
                    </div>
                </main>
                <div>
                    <div css={S.detail}>
                        <RatingScoreUI rating={timeLine.evalScore} />
                        <div style={{ margin: '40px 0'}}>
                                {timeLine.content}
                        </div>
                    </div>
                </div>
                <footer>
                    <div css={S.footer} >
                        <div css={S.place} onClick={showPlaceDetail}>
                            <div css={S.placeDetail}>
                                <div>{timeLine.locName}</div>
                                <div><SlArrowRight /></div>
                            </div>
                            <div css={S.placeDetail}>
                                <span>{timeLine.category}</span>
                                <span css={S.placeWordConnection}> · </span>
                                <span>{timeLine.address}</span>
                            </div>
                        </div>
                        <div css={S.favorites}>

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
                        </div>
                    </div>
                </footer>
            </div >
        </>
    );
};

export default TimelineUI;