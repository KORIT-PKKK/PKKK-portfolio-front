import Cookies from 'js-cookie';
import TimelineUI from './model/TimelineUI';
import React, { useState } from 'react';
import RequestLoginUI from './model/RequestLoginUI';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { axiosInstance } from '../../Controller/interceptors/TokenRefresher';


const TimelineView = () => {
    const [timeLineList, setTimeLineList] = useState([]);
    const navigate = useNavigate();
    const rtk = Cookies.get("refreshToken");
    const authState = rtk !== undefined;

    const menuClickHandle = (path) => {
        navigate(path);
    }

    const searchTimeLineList = useQuery(["searchTimeLineList"], async () => {
        const username = Cookies.get("username");
        const response = await axiosInstance.get(`/api/user/post`, { params: { username: username } })
        return response
    }, {
        enabled: authState,
        onSuccess: (response) => {
            setTimeLineList(response.data)
        }
    });

    if (searchTimeLineList.isLoading) {
        <div>불러오는 중...</div>
    }

    return (
        <>
            {authState ? (timeLineList.length > 0 ? timeLineList.map(timeLine => (<TimelineUI key={timeLine.postId} timeLine={timeLine}
            />))
                : "")
                : (<RequestLoginUI onClick={menuClickHandle} />)}
        </>

    );
};

export default TimelineView;