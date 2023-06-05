/** @jsxImportSource @emotion/react */
import * as S from './styles/UserSettingViewStyle';
import { FiUser } from 'react-icons/fi';
import { FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { axiosInstance, tokenRefresher } from '../../Controller/interceptors/TokenRefresher';
import UserOutLineUI from './model/UserOutLineUI';

const UserSettingView = () => {

    const navigate = useNavigate();
    const rtk = Cookies.get("refreshToken");
    const username = Cookies.get("username");
    const [userId, setUserId] = useState('');
    const [isLoading, setLoadState] = useState(true);

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

    const signOut = async () => {
        const accessToken = Cookies.get("accessToken");
        const accessTokenDecodedToken = jwtDecode(accessToken);
        const data = {
            "username": accessTokenDecodedToken.username,
            "refreshToken": rtk
        }
        try {
            await axiosInstance.post("/api/auth/signout", JSON.stringify(data));
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

    const menuClickHandle = (path) => {
        navigate(path);
    }

    return (
        <div css={S.container}>
            <div css={S.userInfocontainer}>
                <div css={S.userInfoAndBackButton}>
                    {isLoading ? (<div>...불러오는 중</div>) : (
                        <UserOutLineUI currentUserId={userId} />
                    )}
                    <div css={S.backButton} onClick={() => menuClickHandle('/')}>×</div>
                </div>
                <div css={S.profilemodifyButtonBox}>
                    <button css={S.profilemodifyButton} onClick={() => menuClickHandle('/userUpdate')}><FiUser css={S.profilemodifyButtonIcon} />프로필 편집</button>
                </div>
            </div>
            <div css={S.settingView}>
                <div css={S.followSettingContainer}>
                    <div css={S.followSettingBox}>
                        <button css={S.followSettingButton} onClick={() => menuClickHandle('/follow')}>
                            <div css={S.followSetting}><FiUsers css={S.followSettingIcon} /> 팔로우 관리 </div>
                        </button>
                    </div>
                </div>
                <div css={S.Buttoncontainer}>
                    <div css={S.buttonBox} onClick={signOut}>
                        <button css={S.button}><div>로그아웃</div> <div css={S.logoutUsername}>{username}</div></button>
                    </div>
                </div>
                <div css={S.Buttoncontainer}>
                    <div css={S.buttonBox} onClick={() => menuClickHandle('/change/password')}>
                        <button css={S.button}><div>비밀번호 변경</div></button>
                    </div>
                </div>
                <div css={S.Buttoncontainer}>
                    <div css={S.buttonBox}>
                        <button css={S.button} onClick={() => menuClickHandle('/feed')}><div>피드</div></button>
                        <button css={S.button} onClick={() => menuClickHandle('/timeLine')}><div>타임라인</div></button>
                        <button css={S.button} onClick={() => menuClickHandle('/fav')}><div>즐겨찾기</div></button>
                    </div>
                </div>
            </div>
            <footer css={S.footer}>
                <div css={S.componyBox}>
                    <button css={S.componyButton} onClick={() => menuClickHandle('/')}>©PKKK Corp.</button>
                </div>
            </footer>
        </div>
    );
};

export default UserSettingView;