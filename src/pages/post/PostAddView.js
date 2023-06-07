/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as S from "./styles/PostAddViewStyle";
import { MdSaveAlt } from "react-icons/md";
import LogoUI from "../model/LogoUI";
import RatingUI from "./model/RatingUI";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import Cookies from "js-cookie";
import axios from "axios";
import { awsURL, localURL } from "../../config/ApiURL";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../Firebase";
import { axiosInstance } from "../../Controller/interceptors/TokenRefresher";
import { Box, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

//게시글 작성
const PostAddView = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const location = useLocation();
    const locId = location.state.locId;
    const [locDetail, setLocDetail] = useState({});
    const [contentCount, setContentCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [percentages, setPercentages] = useState([]);
    const [value, setValue] = useState(0.0);
    const [hover, setHover] = useState(-1);

    console.log(value);

    const [files, setFiles] = useState("");

    const handleChange = (e) => {
        if (e.target.files.length > 0) {
            const fileList = Array.from(e.target.files);
            setFiles(fileList);
            setPercentages(new Array(fileList.length).fill(0));
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) {
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
                                (snapshot.bytesTransferred /
                                    snapshot.totalBytes) *
                                    100
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

    const menuClickHandle = (path) => {
        navigate(path);
    };

    const contentChangeHandle = (e) => {
        const inputValue = e.target.value;
        setContent(inputValue);
        setContentCount(inputValue.length);

        if (inputValue.length < 10 || inputValue.length > 200) {
            setErrorMessage("글자 수는 10자 이상 200자 이하여야 합니다.");
        } else {
            setErrorMessage("");
        }
    };

    const searchLocDetail = useQuery(
        ["searchLocDetail"],
        async () => {
            const userId = Cookies.get("userId");

            const response = await axios.get(`${awsURL}/api/loc/detail`, {
                params: { userId: userId, locId: locId },
            });
            return response;
        },
        {
            onSuccess: (response) => {
                setLocDetail(response.data);
            },
        }
    );

    const addPost = useMutation(
        async (data) => {
            try {
                const response = await axiosInstance.post(
                    `/api/post/add`,
                    data
                );
                return response;
            } catch {
                alert("포스트 생성 실패하였습니다.");
            }
        },
        {
            onSuccess: (response) => {
                console.log(response.data.postId);
                if (response.status === 200) {
                    alert("포스트 생성 성공하였습니다.");
                    if (files.length < 1) {
                        navigate("/");
                    } else {
                        navigate(`/postDetail`, {
                            state: { postId: response.data.postId },
                        });
                    }
                }
            },
        }
    );

    const addPostSubmitHandle = async () => {
        const uploadList = await handleUpload();
        const data = {
            username: Cookies.get("username"),
            content: content,
            locId: locId,
            evalScore: value,
            picDatas: uploadList,
        };
        console.log(data);
        addPost.mutate(data);
    };

    const labels = {
        0.5: "Useless",
        1: "Useless+",
        1.5: "Poor",
        2: "Poor+",
        2.5: "Ok",
        3: "Ok+",
        3.5: "Good",
        4: "Good+",
        4.5: "Excellent",
        5: "Excellent+",
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
    }

    function HoverRating() {
        return (
            <Box
                sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        console.log(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={
                        <StarIcon
                            style={{ opacity: 0.25 }}
                            fontSize="inherit"
                        />
                    }
                    size="large"
                />
                {value !== null && (
                    <Box sx={{ ml: 2 }}>
                        {labels[hover !== -1 ? hover : value]}
                    </Box>
                )}
            </Box>
        );
    }

    if (searchLocDetail.isLoading) {
        <div>불러오는 중....</div>;
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
                                    <div css={S.placeTitle}>
                                        {locDetail.locName}
                                    </div>
                                    <div css={S.placeTimeDate}>
                                        2023.5.16 (화)
                                    </div>
                                </div>
                                <div css={S.detailContainer}>
                                    <div css={S.detail}>
                                        {locDetail.category}
                                    </div>
                                    <div css={S.wordConnection}>·</div>
                                    <div css={S.detail}>
                                        {locDetail.address}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <main>
                        <div css={S.mainContainer}>
                            <div css={S.mainStarCheck}>
                                별점을 체크해주세요!
                            </div>
                            <div css={S.starScore}>
                                <HoverRating defalutValue={value} hover={hover} />
                            </div>
                            <div>
                                <input
                                    multiple={true}
                                    type="file"
                                    onChange={handleChange}
                                    accept=""
                                />
                            </div>
                        </div>
                        <div>
                            <div css={S.mainTextInputContainer}>
                                <textarea
                                    css={S.mainTextInput}
                                    placeholder=" 리뷰글 작성하기
                                다른 사용자들이 상처받지 않도록 좋은 표현을 사용해주세요.
                                유용한 Tip도 남겨주세요!"
                                    onChange={contentChangeHandle}
                                    name="content"
                                />
                            </div>
                        </div>
                        {errorMessage && (
                            <div css={S.error}>{errorMessage}</div>
                        )}
                        <div css={S.wordCountContainer}>
                            <div>PKKK플레이스</div>
                            <div>{contentCount}/200</div>
                        </div>
                    </main>
                    <footer>
                        <div css={S.mainTextContainer}>
                            <button
                                css={S.mainTextButton}
                                type="button"
                                onClick={addPostSubmitHandle}
                            >
                                <MdSaveAlt />
                                등록하기
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default PostAddView;
