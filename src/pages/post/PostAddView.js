/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from 'react';
import * as S from './styles/PostAddViewStyle';
import { MdSaveAlt } from 'react-icons/md';
import LogoUI from '../model/LogoUI';
import RatingUI from './model/RatingUI';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import Cookies from 'js-cookie';
import axios from 'axios';
import { localURL } from '../../config/ApiURL';
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import storage from '../../Firebase'
import { axiosInstance } from '../../Controller/interceptors/TokenRefresher';


//게시글 작성
const PostAddView = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [evalScore, setEvalScore] = useState(0);
    const location = useLocation();
    const locId = location.state.locId;
    const [locDetail, setLocDetail] = useState({});
    const [contentCount, setContentCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [percentages, setPercentages] = useState([]);

    const [files, setFiles] = useState("");


    const handleChange = (e) => {
        if (e.target.files.length > 0) {
            const fileList = Array.from(e.target.files);
            setFiles(fileList);
            setPercentages(new Array(fileList.length).fill(0));
        }
    }

    const handleUpload = async () => {
        if (files.length === 0) {
            // alert("업로드할 이미지를 먼저 선택해주세요.");
            return [];
        }

        const urlList = [];

        await Promise.all(
            files.map((file, index) => {
                return new Promise((resolve, reject) => {
                    const storageRef = ref(storage, `/files/${uuidv4()}`);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const percent = Math.round(
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            );

                            const newPercentages = [...percentages];
                            newPercentages[index] = percent;
                            setPercentages(newPercentages);
                        },
                        (err) => {
                            console.log(err);
                            reject(err);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref)
                                .then((url) => {
                                    urlList[index] = url;
                                    resolve();
                                })
                                .catch((error) => reject(error));
                        }
                    );
                });
            })
        );

        return urlList;
    };

    const handleRatingChange = (score) => {
        if (score < 0) {
            setEvalScore(0);
        } else {
            setEvalScore(score);
        }
    };

    const menuClickHandle = (path) => {
        navigate(path);
    };

    const contentChangeHandle = (e) => {
        const inputValue = e.target.value;
        setContent(inputValue);
        setContentCount(inputValue.length);

        if (inputValue.length < 10 || inputValue.length > 200) {
            setErrorMessage('글자 수는 10자 이상 200자 이하여야 합니다.');
        } else {
            setErrorMessage('');
        }
    };

    const searchLocDetail = useQuery(["searchLocDetail"], async () => {

        const userId = Cookies.get("userId");

        const response = await axios.get(`${localURL}/api/loc/detail`, { params: { userId: userId, locId: locId } })
        return response;

    }, {
        onSuccess: (response) => {
            setLocDetail(response.data)
        }
    });

    const addPost = useMutation(async (data) => {

        try {
            const response = await axiosInstance.post(`/api/post/add`, data);
            return response;
        } catch {
            alert("포스트 생성 실패하였습니다.");
        }
    }, {
        onSuccess: (response) => {
            console.log(response.data.postId)
            if (response.status === 200) {
                alert("포스트 생성 성공하였습니다.")
                if (files.length < 1) {
                    navigate("/")
                } else {
                    navigate(`/postDetail`, { state: { postId: response.data.postId } });
                }
            }
        }
    });

    const addPostSubmitHandle = async () => {
        const uploadList = await handleUpload();
        const data = {
            "username": Cookies.get("username"),
            "content": content,
            "locId": locId,
            "evalScore": evalScore,
            "picDatas": uploadList
        }
        console.log(data);
        addPost.mutate(data);
    }

    if (searchLocDetail.isLoading) {
        <div>불러오는 중....</div>
    }
    // https://firebasestorage.googleapis.com/v0/b/portfolio-prj-ac487.appspot.com/o/files%2F9f89ef49-6a76-47e8-9b79-320ed0c69ef1?alt=media&token=32e5c26a-6e1c-44ed-b354-f16b133f696e
    // https://firebasestorage.googleapis.com/v0/b/portfolio-prj-ac487.appspot.com/o/files%2F1333a180-2ff8-4a62-9cd7-91736403ac73?alt=media&token=22f96611-bd2e-4ab5-a6a9-786ed1f62e6e
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
                                    <div css={S.placeTitle}>{locDetail.locName}</div>
                                    <div css={S.placeTimeDate}>2023.5.16 (화)</div>
                                </div>
                                <div css={S.detailContainer}>
                                    <div css={S.detail}>{locDetail.category}</div>
                                    <div css={S.wordConnection}>·</div>
                                    <div css={S.detail}>{locDetail.address}</div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <main>
                        <div css={S.mainContainer}>
                            <div css={S.mainStarCheck}>별점을 체크해주세요!</div>

                            <RatingUI onRatingChange={handleRatingChange} />

                            <div css={S.starScore}>
                            </div>
                            <div>
                                <input multiple={true} type="file" onChange={handleChange} accept="" />
                            </div>
                        </div>
                        <div>
                            <div css={S.mainTextInputContainer}>
                                <textarea css={S.mainTextInput} placeholder=' 리뷰글 작성하기
                                다른 사용자들이 상처받지 않도록 좋은 표현을 사용해주세요.
                                유용한 Tip도 남겨주세요!' onChange={contentChangeHandle} name='content' />
                            </div>
                        </div>
                        {errorMessage && <div css={S.error}>{errorMessage}</div>}
                        <div css={S.wordCountContainer}>
                            <div>PKKK플레이스</div>
                            <div>{contentCount}/200</div>
                        </div>
                    </main>
                    <footer>
                        <div css={S.mainTextContainer}>
                            <button css={S.mainTextButton} type="button" onClick={addPostSubmitHandle}><MdSaveAlt />등록하기</button>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default PostAddView;