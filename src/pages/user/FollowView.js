/** @jsxImportSource @emotion/react */
import * as S from './styles/FollowViewStyle';
import React, { useEffect } from 'react';
import { BiLeftArrow } from 'react-icons/bi';
import { Route, Routes, useNavigate } from 'react-router-dom';
import FollowerUI from './model/FollowerUI';
import FollowingUI from './model/FollowingUI';
import { useRecoilState } from 'recoil';
import { pathState } from '../../store/atoms/path/pathAtom';

const FollowView = () => {
    const navigate = useNavigate();
    const [selectPath, setSelectPath] = useRecoilState(pathState);

    const menuClickHandle = (path) => {
        setSelectPath(path);
        navigate(path);
    }

    useEffect(() => {
        const currentPath = window.location.pathname;
        setSelectPath(currentPath);
    }, [setSelectPath]);


    return (
        <>
            <header css={S.header}>
                <button css={S.backButton} onClick={() => menuClickHandle('/')}><BiLeftArrow /></button>
                <h1 css={S.followTitle}>팔로우 관리</h1>
            </header>
            <div css={S.followContainer}>
                <div css={S.followBox}>
                    <div css={S.followButtonBox}>
                        <button css={[S.followeButton, (selectPath === "/follow" || selectPath === "/follow/following") && S.selectButton]} onClick={() => menuClickHandle("/follow/following")}>
                            팔로잉
                        </button>
                        <button css={[S.followeButton, selectPath === "/follow/follower" && S.selectButton]} onClick={() => menuClickHandle("/follow/follower")}>
                            팔로워
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <Routes>
                    <Route path="/" element={<FollowingUI />}></Route>
                    <Route path="/following" element={<FollowingUI />}></Route>
                    <Route path="/follower" element={<FollowerUI />}></Route>
                </Routes>
            </div>
        </>
    );
};

export default FollowView;