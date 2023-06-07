/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as S from './styles/PostDetailUIStyle';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../Controller/interceptors/TokenRefresher';
import RatingScoreUI from '../../model/RatingScoreUI';
import { IoEyeSharp } from 'react-icons/io5';

const PostDetailUI = ({ postDetail }) => {
    const navigate = useNavigate();
    const rtk = Cookies.get("refreshToken");
    const authState = rtk !== undefined;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imageUrls = postDetail.picDatas ? postDetail.picDatas.split(',') : [];
    const [postFavState, setPostFavState] = useState(false);
    const [subState, setSubState] = useState(false);

    useEffect(() => {
        const userPostFavId = postDetail.userPostFavId;
        const userSubId = postDetail.userSubId;

        if (userPostFavId === null) {
            setPostFavState(false);
        } else {
            setPostFavState(true);
        }

        if (userSubId === null) {
            setSubState(false);
        } else {
            setSubState(true);
        }
    }, [postDetail.userPostFavId, postDetail.userSubId]);

    const addPostFav = useMutation(async () => {
        const data = {
            "username": Cookies.get("username"),
            "elementId": postDetail.postId
        }
        try {
            const response = await axiosInstance.post(`/api/user/favorite/post/add`, data);
            return response;
        } catch {
            alert("로그인 후 사용해주세요.");
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                setPostFavState(true);
                alert(`즐겨찾기에서 저장했습니다.`);
            }
        }
    });

    const undoPostFav = useMutation(async () => {
        const data = {
            "elementId": postDetail.userPostFavId
        }
        try {
            const response = await axiosInstance.delete(`/api/user/favorite/post/undo`, { data: data });
            return response;
        } catch {
            alert("로그인 후 사용해주세요.");
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                setPostFavState(false);
                alert(`즐겨찾기에서 삭제했습니다.`);
            }
        }
    });

    const addSub = useMutation(async () => {
        const data = {
            "userId": Cookies.get("userId"),
            "subUserId": postDetail.userId
        }
        try {
            const response = await axiosInstance.post(`/api/user/subscribe/add`, data);
            return response;
        } catch {
            alert("로그인 후 사용해주세요.");
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                setSubState(true);
                alert(`${postDetail.name}님을 팔로우 합니다.`);
            }
        }
    });

    const unSub = useMutation(async () => {
        const data = {
            "elementId": postDetail.userSubId
        }
        try {
            const response = await axiosInstance.delete(`/api/user/subscribe/unSub`, { data: data });
            return response;
        } catch {
            alert("로그인 후 사용해주세요.");
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                setSubState(false);
                alert(`${postDetail.name}님을 언팔로우 했습니다.`);
            }
        }
    });

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
    }

    const showOtherUser = () => {
        if (parseInt(Cookies.get("userId")) !== parseInt(postDetail.userId)) {
            navigate('/otherUser', { state: { userId: postDetail.userId } });
        }
    }


    return (
        <>
            <div css={S.feed}>
                <header css={S.header}>
                    <button css={S.profile} onClick={showOtherUser}>
                        <div css={S.profilePictureBox}>
                            <div css={S.profilePicture}>
                                <img src={postDetail.imageUrl} alt="" css={S.profilePhoto} />
                            </div>
                        </div>
                        <div>
                            <div css={S.profileID}>{postDetail.name}</div>
                            <div>
                                <span css={S.profileInfo}>리뷰{postDetail.postCount}</span>
                                <span css={S.profileInfo}> · </span>
                                <span css={S.profileInfo}>사진{postDetail.picCount}</span>
                                <span css={S.profileInfo}> · </span>
                                <span css={S.profileInfo}>팔로워{postDetail.flwCount}</span>
                            </div>
                        </div>
                    </button>
                    {(!authState || parseInt(Cookies.get("userId")) === parseInt(postDetail.userId))
                        ? (<></>)
                        : (<>
                            {subState ?
                                <>
                                    <div css={S.unFollow}>
                                        <button css={S.unFollowButton} onClick={() => { unSub.mutate() }}>언팔로우</button>
                                    </div>
                                </>
                                :
                                <>
                                    <div css={S.follow}>
                                        <button css={S.followButton} onClick={() => { addSub.mutate() }}>팔로우</button>
                                    </div>
                                </>
                            }

                            {postFavState ?
                                <>
                                    <div css={S.postUnSaveButton} onClick={() => { undoPostFav.mutate() }}>
                                        <div><AiFillStar css={S.saveUnIcon} /></div>
                                        <div css={S.postUnSave}>저장</div>
                                    </div>
                                </>
                                :
                                <>
                                    <div css={S.postSaveButton} onClick={() => { addPostFav.mutate() }}>
                                        <div><AiOutlineStar css={S.saveIcon} /></div>
                                        <div css={S.postSave}>저장</div>
                                    </div>
                                </>
                            }
                        </>)
                    }
                </header>
                <main css={S.main}>
                    <div css={S.imageBox}>
                        {imageUrls.map((imgUrl, index) => (
                            <img
                                key={index}
                                src={imgUrl}
                                alt=""
                                css={[
                                    S.imgContent,
                                    { display: index === currentImageIndex ? 'block' : 'none' }
                                ]}
                            />
                        ))}
                    </div>
                    {imageUrls.length > 1 && (
                        <div css={S.buttonBox}>
                            {<div css={S.leftIcon} onClick={handlePrevImage}><BsArrowLeftSquare css={S.fiIcon}/></div>}
                            {<div css={S.rightIcon} onClick={handleNextImage}><BsArrowRightSquare css={S.fiIcon} /></div>}
                        </div>
                    )}
                </main>
                <div css={S.postViewCntBox}>
                    <div css={S.postViewCnt}>
                        <IoEyeSharp css={S.postViewCntIcon}/>{postDetail.postViewCnt}
                    </div>
                </div>
                <div>
                    <div css={S.detail}>
                        <RatingScoreUI rating={postDetail.evalScore} />
                        <div style={{ margin: '40px 0'}}>
                            {postDetail.content}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetailUI;