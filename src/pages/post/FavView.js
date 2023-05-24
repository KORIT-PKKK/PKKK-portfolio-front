import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './styles/FavViewStyle';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RequestLoginUI from './model/RequestLoginUI';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { MdPlace } from 'react-icons/md';
import FavPostView from './FavPostView';
import FavPlaceView from './FavPlaceView';

const FavView = () => {
    const navigate = useNavigate();
    const [selectPath, setSelectPath] = useState("/fav");

    const menuClickHandle = (path) => {
        navigate(path);
    }

    const pathClickHandle = (path) => {
        navigate(path);
        setSelectPath(path);
    }

    useEffect(() => {
        const currentPath = window.location.pathname;
        setSelectPath(currentPath);
    }, []);

    const rtk = Cookies.get("refreshToken");
    const authState = rtk !== undefined;

    return (
        <>
            {authState ? (
                <>
                    <div css={S.headContainer}>
                        <div css={S.buttonBox}>
                            <button css={[S.button, (selectPath === "/fav" || selectPath === "/fav/post") && S.selectedMenu]} onClick={() => pathClickHandle('/fav/post')}>
                                <AiOutlineMenuFold css={(selectPath === "/fav" || selectPath === "/fav/post") && S.icons} />피드
                            </button>
                            <button css={[S.button, selectPath === "/fav/place" && S.selectedMenu]} onClick={() => pathClickHandle('/fav/place')}>
                                <MdPlace css={ selectPath === "/fav/place" && S.icons} />장소
                            </button>
                        </div>
                    </div>
                    <div>
                        <Routes>
                            <Route path="/" element={<FavPostView />} />
                            <Route path="/post" element={<FavPostView />} />
                            <Route path="/place" element={<FavPlaceView />} />
                        </Routes>
                    </div> 
                </>
            ) : (<RequestLoginUI onClick={menuClickHandle} />)}
        </>
    );
};

export default FavView;