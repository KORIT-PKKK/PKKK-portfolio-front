import './App.css';
import { Global } from '@emotion/react';
import { Reset } from './styles/Global/reset';
import { Route, Routes } from 'react-router-dom';
import MainView from './pages/MainView';
import UserSettingView from './pages/user/UserSettingView';
import UserUpdateView from './pages/user/UserUpdateView';
import LoginView from './pages/auths/LoginView';
import RegisterView from './pages/auths/RegisterView';
import FollowView from './pages/user/FollowView';
import PostAddView from './pages/post/PostAddView';
import SignInRoute from './components/auth/SignInRoute';
import OtherUserView from './pages/otherUser/OtherUserView';
import PostDetailView from './pages/postDetail/PostDetailView';
import LocationOverView from './pages/location/LocationOverView';
import ChangePasswordView from './pages/auths/ChangePasswordView';
import PostUpdateView from './pages/post/PostUpdateView';

function App() {
  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        <Route path='/auth/login' element={<SignInRoute path='/auth/login' element={<LoginView />} />} />
        <Route path='/auth/register' element={<SignInRoute path='/auth/register' element={<RegisterView />} />} />
        <Route path='/*' element={<MainView />} />
        <Route path='/userSetting' element={<SignInRoute path='/userSetting' element={<UserSettingView />} />} />
        <Route path='/userUpdate' element={<SignInRoute path='/userUpdate' element={<UserUpdateView />} />} />
        <Route path='/follow/*' element={<FollowView />} />
        <Route path='/postAddView' element={<SignInRoute path='/postAddView' element={<PostAddView />} />} />
        <Route path='/postUpdateView' element={<SignInRoute path='/postUpdateView' element={<PostUpdateView />} />} />
        <Route path='/otherUser' element={<OtherUserView />} />
        <Route path='/postDetail' element={<PostDetailView />} />
        <Route path='/locationDetail' element={<LocationOverView />} />
        <Route path='/change/password' element={<SignInRoute path='/change/password' element={<ChangePasswordView />} />} />
      </Routes >
    </>
  );
}

export default App;
