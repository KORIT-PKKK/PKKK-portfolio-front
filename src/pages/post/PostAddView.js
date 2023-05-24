/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from 'react';
import * as S from './styles/PostAddViewStyle';
import { MdSaveAlt } from 'react-icons/md';
import LogoUI from '../model/LogoUI';
import RatingUI from './model/RatingUI';
import { useNavigate } from 'react-router-dom';


//게시글 작성
const PostAddView = () => {
    const navigate = useNavigate();
    const [countent, setContent] = useState("");
    const [imgFiles, setImgFiles] = useState([]);
    const fileId = useRef(1);

    const formData = new FormData();

    const menuClickHandle = (path) => {
        navigate(path);
    }

    return (
        <>
            <div>
                <div>
                    <LogoUI onClick={menuClickHandle} />
                </div>
                <div css={S.postContainer}>
                    <header>
                        <div css={S.post}>
                            <h1>게시글 작성</h1>
                        </div>
                        <div css={S.footer}>
                            <div css={S.place}>
                                <div css={S.placeDetail}>
                                    <div css={S.placeTitle}>넉아웃</div>
                                    <div css={S.placeTimeDate}>2023.5.16 (화)</div>
                                    <div css={S.placeVisit}>1번째 방문</div>
                                </div>
                                <div css={S.placePrice}>280.000원</div>
                            </div>
                        </div>
                        <div>카테고리(전체, 한식, 중식, 일식, 양식, 문화) 선택</div>
                    </header>
                    <main>
                        <div css={S.mainContainer}>
                            <div css={S.mainStarCheck}>별점을 체크해주세요!</div>

                            <RatingUI />

                            <div css={S.starScore}>
                                {/* <FaStar size={60} />
                                <FaStar size={60} />
                                <FaStar size={60} />
                                <FaStar size={60} />
                                <FaStar size={60} /> */}
                            </div>
                            <button css={S.pictureButton}>클라우드랑 연결해서 사진 첨부</button>
                        </div>
                        <div>

                            <div css={S.mainTextInputContainer}>
                                <textarea css={S.mainTextInput} placeholder=' 리뷰글 작성하기
                                다른 사용자들이 상처받지 않도록 좋은 표현을 사용해주세요.
                                유용한 Tip도 남겨주세요!'/>
                            </div>
                        </div>
                        <div>구글플레이스</div>
                    </main>
                    <footer>
                        <div css={S.mainTextContainer}>
                            <button css={S.mainTextButton} type="button"><MdSaveAlt />등록하기</button>
                            {/* <button css={S.mainTextButton} type="button"><BsPencilSquare />수정</button> */}
                            {/* <button css={S.mainTextButton} type="button"><AiOutlineDelete />삭제</button> */}
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default PostAddView;