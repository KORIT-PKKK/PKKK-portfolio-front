import Cookies from 'js-cookie';
import TimelineUI from './model/TimelineUI';
import React from 'react';
import RequestLoginUI from './model/RequestLoginUI';
import { useNavigate } from 'react-router-dom';


const TimelineView = () => {
    const navigate = useNavigate();

    const menuClickHandle = (path) => {
        navigate(path);
    }

    const rtk = Cookies.get("refreshToken");
    const authState = rtk !== undefined;

    return (
        <>
            {authState ? (<TimelineUI />) : (<RequestLoginUI onClick={menuClickHandle} />)}
        </>
    );
};

export default TimelineView;