import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import PostUI from './model/PostUI';
import { useNavigate } from 'react-router-dom';
import { awsURL, localURL } from '../../config/ApiURL';
import Cookies from 'js-cookie';

const PostView = () => {

    const [postList, setPostList] = useState([]);
    const navigate = useNavigate();
    const rtk = Cookies.get("refreshToken");

    const searchPostList = useQuery(["searchPostList"], async () => {
            
        if (rtk === undefined) {
            const response = await axios.get(`${awsURL}/api/post/list`)
            return response;
        }

        const userId = Cookies.get("userId");

        const response = await axios.get(`${awsURL}/api/post/list`, { params: { userId: userId } })
        return response;

    }, {
        onSuccess: (response) => {
            setPostList(response.data)
        }
    });

    if (searchPostList.isLoading) {
        return <div>불러오는 중...</div>
    }



    const menuClickHandle = (path) => {

        navigate(path);
    }
    console.log(postList);
    return (
        <>
            {postList.length > 0 ? postList.map(post => (<PostUI key={post.postId} post={post} onClick={menuClickHandle} ></PostUI>)) : ""}
        </>
    );
};

export default PostView;