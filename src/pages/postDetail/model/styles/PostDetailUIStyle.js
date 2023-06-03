import { css } from '@emotion/react';

export const feed = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 26px 20px 28px;
    width: 720px;
    height: 100%;
    margin: 20px auto 0px;
    background-color: white;
    border: 1px solid #dbdbdb;
`;

export const header = css`
    display: flex;
    align-items: center;
    width: 680px;
    height: 42px;
`;

export const profile = css`
    border: 1px solid white;
    display: flex;
    width: 100%;
    height: 62px;
    margin: -10px;
    padding: 10px;
    background-color: white;
    cursor: pointer;
`;

export const profilePictureBox = css`
    width: 42px;
    height: 42px;
    margin: 0px 8px 0px 0px;
`;

export const profilePicture = css` 
    text-align: left;
    border: 2px solid #dbdbdb;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    overflow-y: hidden;
`;

export const profilePhoto = css`
    width: 100%;
    height: 100%;
`;

export const profileID = css`
    text-align: left;
    font-size: 16px;
    font-weight: 600;
`;

export const profileInfo = css`
    text-align: left;
    font-size: 12px;
    color: #8F8F8F;
`;

export const follow = css`
    padding: 5px;
    justify-content: center;
`;

export const unFollow = css`
    padding: 5px;
    justify-content: center;
`;

export const followButton = css`
    width: 80px;
    height: 30px;
    font-weight: 600;
    font-size: 13px;
    border: #F3F9FE;
    border-radius: 5px;
    background-color: #F3F9FE;
    color: #2D8DEE;
    cursor: pointer;
`;

export const unFollowButton = css`
    width: 80px;
    height: 30px;
    font-weight: 600;
    font-size: 13px;
    border: #F3F9FE;
    border-radius: 5px;
    background-color: #dbdbdb;
    color: black;
    cursor: pointer;
`;

export const postSaveButton = css`
    width: 40px;
    margin: 0px 10px;
    font-size: 11px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
`;

export const postUnSaveButton = css`
    width: 40px;
    margin: 0px 10px;
    font-size: 11px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
`;

export const postSave = css`
    color: black;
`;

export const postUnSave = css`
    color: green;
`;

export const saveIcon = css`
    font-size: 16px;
    fill: black;
`;

export const saveUnIcon = css`
    font-size: 16px;
    fill: green;
`;

export const main = css`
    width: 100%;
    height: 467px;
    padding-top: 16px;
`;

export const imageBox = css`
    width: 375px;
    height: 430px;
    margin: 0px auto;
    overflow-y: hidden;
`;

export const imgContent = css`
    width: 100%;
    height: 100%;
`;

export const buttonBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const button = css`

`;

export const detail = css`
    border: 1px solid #dbdbdb;
    width: 680px;
    height: auto;
    margin: 5px 0px 5px 0px;
    padding: 30px 20px 30px 20px;
`;