import React, { useState } from 'react';
import PostDetailUI from './model/PostDetailUI';
import PlaceUI from './model/PlaceUI';
import HeaderUI from './model/HeaderUI';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const PostDetailView = () => {
    const { postId } = useParams();
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
        const params = {
            params: {
                postId: postId
            }
        }
        const response = await axios.get("http://192.168.2.18:8080/api/post/view", params);
        return response;
    }, {
        onSuccess: (response) => {
            setPostDetail(response.data[0]);
            console.log(response)
        }
    });

    if (postDetailView.isLoading) {
        <div>불러오는 중...</div>
    }

    return (
        <>
            <HeaderUI onClick={menuClickHandle} />
            <PlaceUI postDetail={postDetail} />
            <PostDetailUI postDetail={postDetail} />
        </>
    );
};

export default PostDetailView;