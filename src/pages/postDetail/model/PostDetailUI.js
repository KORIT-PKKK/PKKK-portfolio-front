/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as S from './styles/PostDetailUIStyle';
import { AiOutlineStar } from 'react-icons/ai';
import { IoMdArrowDropleftCircle } from 'react-icons/io';
import { IoMdArrowDroprightCircle } from 'react-icons/io';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostDetailUI = ({ postDetail }) => {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imageUrls = postDetail.picDatas ? postDetail.picDatas.split(',') : [];

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
    }

    const showOtherUser = () => {
        navigate('/otherUser', { state: { userId: postDetail.userId } });
    }

    return (
        <>
            <div css={S.feed}>
                <header css={S.header}>
                    <button css={S.profile} onClick={showOtherUser}>
                        <div css={S.profilePictureBox}>
                            <div css={S.profilePicture}></div>
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
                    <div css={S.follow}>
                        <button css={S.followButton}>팔로우</button>
                    </div>
                    <div css={S.block}>
                        <button css={S.blockButton}><AiOutlineStar /></button>
                    </div>
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
                            {<button onClick={handlePrevImage} css={S.button}><IoMdArrowDropleftCircle /></button>}
                            {<button onClick={handleNextImage} css={S.button}><IoMdArrowDroprightCircle /></button>}
                        </div>
                    )}
                </main>
                <div>
                    <div css={S.detail}>
                        {postDetail.content}{postDetail.evalScore}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetailUI;