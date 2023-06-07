/** @jsxImportSource @emotion/react */
import * as S from "./styles/PostUpdateViewStyle";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { awsURL, localURL } from "../../config/ApiURL";
import { useQuery } from "react-query";
import { BiLeftArrow } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import PhotoCardUI from "./model/PhotoCardUI";
import { v4 as uuidv4 } from "uuid";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import storage from "../../Firebase";
import { axiosInstance } from "../../Controller/interceptors/TokenRefresher";
import EmptyBox from "./model/EmptyBox";
import { Rating } from "@mui/material";
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';


const PostUpdateView = () => {
  const navigate = useNavigate();
  const rtk = Cookies.get("refreshToken");
  const location = useLocation();
  const postId = location.state.postId;
  const [postDetail, setPostDetail] = useState({
    postId: 0,
    userId: 0,
    locId: 0,
    postEvalId: 0,
    name: "",
    imageUrl: "",
    postCount: 0,
    picCount: 0,
    flwCount: 0,
    content: "",
    postViewCnt: 0,
    evalScore: "",
    picDatas: "",
    createAt: "",
    updateAt: "",
  });
  const [content, setContent] = useState("");
  const [contentCount, setContentCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [percentages, setPercentages] = useState([]);
  const [deleteList, setDeleteList] = useState([]);
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState(0.0);
  const [hover, setHover] = useState(-1);
  const fileInput = React.useRef(null);

  console.log(value);

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      const fileList = Array.from(e.target.files);
      setFiles([...files, ...fileList]);

      const temps = [];
      fileList.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            temps.push(reader.result);
            resolve();
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
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

  useEffect(() => {
    console.log(`del : ${deleteList}, ${deleteList.length}`);
  }, [deleteList]);

  const handleDeleteURL = (url) => {
    const trimedUrl = url.trim();
    const updateList = imageUrls.filter((i) => i !== trimedUrl);
    setImageUrls(updateList);
    if (deleteList.length < 1) {
      setDeleteList([trimedUrl]);
    } else {
      setDeleteList([...deleteList, trimedUrl]);
    }
  };

  const handleDeleteTemp = (file) => {
    const updateList = files.filter((i) => i !== file);
    setFiles(updateList);
  };

  const handleDelete = async () => {
    if (deleteList.length === 0) {
      return;
    }

    console.log(deleteList);

    for (const url of deleteList) {
      const path = decodeURIComponent(url.split("?")[0].split("/o/")[1]);

      console.log(`path : ${path}`)
      const fileRef = ref(storage, path);

      if (!fileRef) {
        console.log(`ref가 undefined입니다. 다음 반복으로 넘어갑니다.`);
        continue;
      }

      try {
        await deleteObject(fileRef);
        console.log(`파일 삭제 성공: ${url}`);
      } catch (error) {
        console.log(`파일 삭제 실패: ${url}`, error);
      }
    }
  };

  const postDetailView = useQuery(
    ["postDetailView"],
    async () => {
      if (rtk === undefined) {
        const params = {
          params: {
            postId: postId,
          },
        };
        const response = await axios.get(`${awsURL}/api/post/view`, params);
        return response;
      }

      const userId = Cookies.get("userId");
      const params = {
        params: {
          postId: postId,
          userId: userId,
        },
      };
      const response = await axios.get(`${awsURL}/api/post/view`, params);
      return response;
    },
    {
      onSuccess: (response) => {
        const post = response.data[0];
        setPostDetail(post);
        setValue(post.evalScore);
        setContent(post.content);
        setContentCount(post.content.length);
        if (post.picDatas && post.picDatas.includes(',')) {
          setImageUrls(post.picDatas.split(','));
        } else {
          setImageUrls(post.picDatas ? [post.picDatas] : []);
        }
      },
    }
  );

  useEffect(() => {
    console.log(postDetail);
  }, [postDetail])



  const contentChangeHandle = (e) => {
    const inputValue = e.target.value;
    setContent(inputValue);
    setContentCount(inputValue.length);

    if (inputValue.length < 10 || inputValue.length > 200) {
      setErrorMessage("내용을 10자 이상 입력해주세요. (최대 200자)");
    } else {
      setErrorMessage("");
    }
  };

  if (postDetailView.isLoading) {
    <div>불러오는 중...</div>;
  }

  const updatePost = async (uploadUrls) => {
    const data = {
      postId: postDetail.postId,
      locId: postDetail.locId,
      postEvalId: postDetail.postEvalId,
      username: Cookies.get("username"),
      evalScore: value,
      picDatas: uploadUrls,
      delPicDatas: deleteList,
      content: content,
    };

    console.log(`data : ${data.evalScore}`);

    try {
      const response = await axiosInstance.put(`/api/post/update`, data);
      return response;
    } catch {
      alert("게시글을 수정하지 못했습니다.");
    }
  };

  const updateSubmitHandle = async () => {
    const uploadedUrls = await handleUpload();
    console.log(uploadedUrls);
    updatePost(uploadedUrls).then((res) => {
      if (res.status === 200) {
        handleDelete();
        alert("게시글 수정 완료.");
        navigate("/");
        window.location.reload();
      }
    })
    setFiles([]);

  };

  const addBtnClick = () => {
    fileInput.current.click();
  };

  const backButtonHandle = () => {
    navigate("/");
  };

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  function HoverRating() {
    return (
      <Box
        sx={{
          width: 200,
          display: 'flex',
          alignItems: 'center',
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
          emptyIcon={<StarIcon style={{ opacity: 0.25 }} fontSize="inherit" />}
          size="large"
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
    );
  }


  return (
    <>
      <div>
        <div css={S.headerContainer}>
          <div css={S.backButton} onClick={backButtonHandle}>
            <BiLeftArrow />
          </div>
        </div>
        <div css={S.postContainer}>
          <header>
            <div css={S.post}>
              <h1>게시글 수정</h1>
            </div>
            <div css={S.footer}>
              <div css={S.place}>
                <div css={S.placeDetail}>
                  <div css={S.placeTitle}>{postDetail.locName}</div>
                  <div css={S.placeTimeDate}>2023.5.16 (화)</div>
                </div>
                <div css={S.detailContainer}>
                  <div css={S.detail}>{postDetail.category}</div>
                  <div css={S.wordConnection}>·</div>
                  <div css={S.detail}>{postDetail.address}</div>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div css={S.mainContainer}>
              <div css={S.mainStarCheck} />
                <HoverRating defalutValue={value} hover={hover} />
              </div>
            {
              <div css={S.photoContainer}>
                {imageUrls.map((url) => (
                  <PhotoCardUI
                    key={url}
                    url={url}
                    onClick={() => handleDeleteURL(url)}
                  />
                ))}
                {files.map((file) => (
                  <PhotoCardUI
                    key={file.name}
                    url={URL.createObjectURL(file)}
                    onClick={() => handleDeleteTemp(file)}
                  />
                ))}
                <EmptyBox onClick={addBtnClick} />
                <input
                  multiple={true}
                  type="file"
                  accept=""
                  ref={fileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </div>
            }
            <div>
              <div css={S.mainTextInputContainer}>
                <textarea
                  css={S.mainTextInput}
                  placeholder="리뷰를 작성해주세요."
                  onChange={contentChangeHandle}
                  name="content"
                  value={content}
                />
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
              <button
                css={S.mainTextButton}
                type="button"
                onClick={updateSubmitHandle}
              >
                <BsPencilSquare />
                수정
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default PostUpdateView;
