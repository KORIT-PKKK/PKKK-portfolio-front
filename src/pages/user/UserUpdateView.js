/** @jsxImportSource @emotion/react */
import Cookies from "js-cookie";
import * as S from "./styles/UserUpdateViewStyle";
import React, { useEffect, useState } from "react";
import { BiLeftArrow } from "react-icons/bi";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Controller/interceptors/TokenRefresher";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import storage from "../../Firebase";
import CircleAvatar from "./model/CircleAvatar";

const UserUpdateView = () => {
  const navigate = useNavigate();
  const [nicknameLength, setNicknameLength] = useState(0);
  const [introduceLength, setIntroduceLength] = useState(0);
  const [updateName, setUpdateName] = useState("");
  const [updateIntro, setUpdateIntro] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [file, setFile] = useState();
  const fileInput = React.useRef(null);

  const menuClickHandle = (path) => {
    navigate(path);
  };

  const uploadTemp = (e) => {
    console.log("executed");
    if (e.target.files.length > 0) {
      const temp = e.target.files[0];

      setFile(temp);

      const temps = [];

      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          temps.push(reader.result);
          resolve();
        };
        reader.onerror = reject;
        reader.readAsDataURL(temp);
      });
    }
  };

  const handleUpload = async () => {
    console.log(`wait : ${file}`);
    if (file === undefined) {
      return;
    }

    const storageRef = ref(storage, `files/${Cookies.get("username")}`);
    const snapshot = await uploadBytesResumable(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    console.log(url);
    return url;
  };

  const searchUserInfo = useQuery(
    ["searchUserInfo"],
    async () => {
      const userId = Cookies.get("userId");
      console.log(userId);
      const response = await axiosInstance.get(`/api/user/detail`, {
        params: { userId: userId },
      });

      console.log(`response : ${response.data.imageUrl}`);
      return response;
    },
    {
      onSuccess: (response) => {
        const userData = response.data;
        if (userData.name === null) {
          userData.name = "";
        }
        if (userData.introduce === null) {
          userData.introduce = "";
        }
        if (userData.imageUrl === null) {
          userData.imageUrl = "";
        }
        setUpdateName(userData.name);
        setUpdateIntro(userData.introduce);
        setProfileImage(userData.imageUrl);
        console.log(`current image url : ${userData.imageUrl}`)
        setNicknameLength(userData.name.length);
        setIntroduceLength(userData.introduce.length);
      },
    }
  );

  const updateUserInfo = async (url) => {
    const data = {
      username: Cookies.get("username"),
      name: updateName,
      introduce: updateIntro,
      imageUrl: url,
    };

    console.log(data);

    try {
      const resp = await axiosInstance.put(`/api/user/detail/update`, data);
      return resp;
    } catch (error) {
      console.log(error);
      alert("Info update failed");
    }
  };

  const updateUserInfoClick = async () => {
    try {
      const url = await handleUpload();
      console.log(`url : ${url}`);
      updateUserInfo(url);
      alert("Info update success.");
    } catch (error) {
      console.log(error);
      alert("Info update failed");
    }
    setFile("");
    navigate("/");
    window.location.reload();
  };

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    setUpdateName(inputValue);
  };

  const handleIntroChange = (e) => {
    const inputValue = e.target.value;
    setUpdateIntro(inputValue);
  };

  const addBtnClick = () => {
    fileInput.current.click();
  };

  useEffect(() => {
    setNicknameLength(updateName.length);
  }, [updateName]);

  useEffect(() => {
    setIntroduceLength(updateIntro.length);
  }, [updateIntro]);

  if (searchUserInfo.isLoading) {
    <div>불러오는 중...</div>;
  }

  return (
    <>
      <header css={S.header}>
        <button css={S.backButton} onClick={() => menuClickHandle("/")}>
          <BiLeftArrow />
        </button>
        <h1 css={S.headerTitle}>프로필 설정</h1>
      </header>
      <div css={S.infoModifyBox}>

        <div css={S.photoBox} onClick={addBtnClick}>
          {file !== undefined ? <CircleAvatar url={file && URL.createObjectURL(file)} /> :
            <CircleAvatar url={profileImage} />}
        </div>
        <input
          type="file"
          accept=""
          ref={fileInput}
          onChange={uploadTemp}
          style={{ display: "none" }}
        />
        <div css={S.inputLabel}>닉네임</div>
        <input
          css={S.nickNameInput}
          type="text"
          name="name"
          placeholder="한글, 영문, 숫자, 공백2~20자까지 입력할 수 있어요!"
          value={updateName}
          onChange={handleNameChange}
          minLength={2}
          maxLength={20}
        />
        <div css={S.nickNameState}>
          <div>닉네임을 입력해주세요!</div>
          <div>{nicknameLength}/20</div>
        </div>
        <div css={S.inputLabel}>소개</div>
        <textarea
          css={S.introduceInput}
          type="text"
          name="introduce"
          placeholder="예) 분위기 있는 카페 찾아다녀요~"
          value={updateIntro}
          onChange={handleIntroChange}
          maxLength={150}
        />
        <div css={S.introduceState}>{introduceLength}/150</div>
      </div>
      <div css={S.saveBox}>
        <button css={S.saveButton} onClick={updateUserInfoClick}>
          저장하기
        </button>
      </div>
    </>
  );
};

export default UserUpdateView;
