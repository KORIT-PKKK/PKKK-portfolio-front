import axios from 'axios';
import Cookies from 'js-cookie';
import { localURL } from '../../config/ApiURL';

const axiosInstance = axios.create({
    baseURL: `${localURL}`,
    headers: { "Content-Type": "application/json" }
});

const tokenRefresher = async () => {
    const refreshToken = Cookies.get('refreshToken');
    const username = Cookies.get('username');
    const option = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    console.log("REFRESHER HERE!")

    const refreshInfo = {
        "username": username,
        "refreshToken": refreshToken
    }
    const response = await axios.post(`${localURL}/api/auth/refresh`, JSON.stringify(refreshInfo), option);

    let accessToken = response.data.accessToken;
    console.log(response);

    Cookies.set('accessToken', accessToken, { expires: 1 / 24 });

    return accessToken;
}

axiosInstance.interceptors.request.use(

    async (request) => {
        console.log("Request has called");

        let atk = Cookies.get("accessToken");
        if (atk === undefined || atk === null || atk === "") {
            atk = await tokenRefresher();
        }

        request.headers.Authorization = `Bearer ${atk}`

        console.log(request);
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { axiosInstance, tokenRefresher };