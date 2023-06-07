import React, { useEffect, useState } from 'react';
import PostDetailUI from './model/PostDetailUI';
import PlaceUI from './model/PlaceUI';
import HeaderUI from './model/HeaderUI';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { awsURL, localURL } from '../../config/ApiURL';
import Cookies from 'js-cookie';

const PostDetailView = () => {
    const location = useLocation();
    const postId = location.state.postId;
    const rtk = Cookies.get("refreshToken");

    const [postDetail, setPostDetail] = useState({
        postId: 0,
        userId: 0,
        locId: 0,
        name: "",
        imageUrl: "",
        postCount: 0,
        picCount: 0,
        flwCount: 0,
        content: "",
        postViewCnt: 0,
        evalIds: "",
        picDatas: "",
        createAt: "",
        updateAt: "",
    });


    const navigate = useNavigate();

    const menuClickHandle = (path) => {
        navigate(path);
    }

    const postDetailView = useQuery(["postDetailView"], async () => {
        if (rtk === undefined) {
            const params = {
                params: {
                    postId: postId
                }
            };
            const response = await axios.get(`${awsURL}/api/post/view`, params);
            return response;
        }

        const userId = Cookies.get("userId");
        const params = {
            params: {
                postId: postId,
                userId: userId
            }
        };
        const response = await axios.get(`${awsURL}/api/post/view`, params);
        return response;
    }, {
        enabled: false,
        onSuccess: (response) => {
            setPostDetail(response.data[0]);
        }
    });

    useEffect(() => {
        postDetailView.refetch();
    }, []);

    if (postDetailView.isLoading) {
        return <div>불러오는 중...</div>;
    }

    console.log(postDetail);
    return (
        <>
            <HeaderUI onClick={menuClickHandle} />
            <PlaceUI postDetail={postDetail} />
            <PostDetailUI postDetail={postDetail} />
        </>
    );
};

export default PostDetailView;