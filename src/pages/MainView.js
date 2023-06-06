/** @jsxImportSource @emotion/react */
import * as S from './styles/MainViewStyle';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LogoUI from './model/LogoUI';
import UserOutLineUI from './model/UserOutLineUI';
import ButtonUI from './model/ButtonUI';
import TabsUI from './model/TabsUI';
import PostView from './post/PostView';
import TimelineView from './post/TimelineView';
import Cookies from 'js-cookie';
import RequestLoginUI from './model/RequestLoginUI';
import { useEffect, useState } from 'react';
import FavView from './post/FavView';
import { useRecoilState } from 'recoil';
import jwtDecode from 'jwt-decode';
import { axiosInstance, tokenRefresher } from '../Controller/interceptors/TokenRefresher';
import GoogleMaps from './google/GoogleMaps';
import { pathState } from '../store/atoms/path/pathAtom';


const MainView = () => {
    const navigate = useNavigate();
    const authRequiredPath = ["/userSetting", "/userUpdate", "/postAddView", "/postUpdateView"];
    const authPath = "/auth";
    const rtk = Cookies.get("refreshToken");
    const [selectPath, setSelectPath] = useRecoilState(pathState);
    const [authState, setAuthState] = useState(false);
    const [userId, setUserId] = useState('');
    const [isLoading, setLoadState] = useState(true);

    useEffect(() => {
        const currentPath = window.location.pathname;
        setSelectPath(currentPath);
    }, [setSelectPath]);

    const menuClickHandle = (path) => {
        if (!authState && authRequiredPath.some(authPath => path.startsWith(authPath))) {
            console.log(`current state : ${rtk}`);
            navigate("/auth/login");
            return;
        }

        if (authState && path.startsWith(authPath)) {
            navigate("/");
            return;
        }

        navigate(path);
    }

    const selectClickHandle = (path) => {
        navigate(path);
        setSelectPath(path);
    }

    const signOut = async () => {
        const accessToken = Cookies.get("accessToken");
        const accessTokenDecodedToken = jwtDecode(accessToken);
        const data = {
            "username": accessTokenDecodedToken.username,
            "refreshToken": rtk
        }
        try {
            await axiosInstance.post("/api/auth/signout", data);
            Cookies.remove("accessToken", { path: '/' });
            Cookies.remove("refreshToken", { path: '/' });
            Cookies.remove("username", { path: '/' });
            Cookies.remove("userId", { path: '/' });
            alert("로그아웃 되었습니다!");
            window.location.replace("/");
        } catch (error) {
            console.log(error.response)
        }

    }

    useEffect(() => {
        const fetchUserId = async () => {
            if (rtk !== undefined) {
                let atk = Cookies.get('accessToken');
                if (atk === undefined || atk === null || atk === '') {
                    atk = await tokenRefresher();
                }

                const decodedToken = jwtDecode(atk);
                const userId = decodedToken.userId;

                setUserId(userId);
            }
            setLoadState(false);
        };

        fetchUserId();
    }, [rtk]);

    useEffect(() => {
        const stateChange = async () => {
            if (rtk !== undefined) {
                setAuthState(true);
            }
        }

        stateChange();
    });

    const moveLogin = () => {
        navigate("auth/login")
    }

    return (
        <>
            <header>
                <LogoUI onClick={menuClickHandle} />
                <div css={S.userOutLine}>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : authState ? (
                        <>
                            <UserOutLineUI currentUserId={userId} onClick={selectClickHandle} />
                            <ButtonUI onClick={selectClickHandle} />
                        </>
                    ) : (
                        <>
                            <RequestLoginUI onClick={menuClickHandle} />
                            <ButtonUI onClick={moveLogin} />
                        </>
                    )}

                    <TabsUI onClick={selectClickHandle} selectPath={selectPath} />
                </div>
            </header >
            <main css={S.main}>
                <Routes>
                    <Route path="/" element={<PostView />} />
                    <Route path="/feed" element={<PostView />} />
                    <Route path="/timeLine" element={<TimelineView />} />
                    <Route path="/fav/*" element={<FavView />} />
                    <Route path='/map' element={<GoogleMaps />} />
                </Routes>
            </main>
            <footer css={S.footerBox}>
                <div css={S.logoutBox}>
                    {authState ? (<button css={S.logoutButton} onClick={signOut}>로그아웃</button>)
                        : (<button css={S.logoutButton} onClick={() => menuClickHandle('/auth/login')}>로그인</button>)}

                    <div css={S.wordSeparation}>|</div>
                    <button css={S.logoutButton} onClick={() => menuClickHandle('/userSetting')}>전체서비스</button>
                </div>
                <div css={S.componyBox}>
                    <button css={S.componyButton} onClick={() => menuClickHandle('')}>©pkkk Corp.</button>
                </div>
            </footer >
        </>
    );
};

export default MainView;