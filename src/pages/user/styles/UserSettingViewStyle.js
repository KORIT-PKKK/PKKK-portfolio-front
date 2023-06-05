import { css } from "@emotion/react";

export const container = css`
    height: 1000px;
    background-color: #fafafa;
`;

export const userInfocontainer = css` 
    background-color: #dbdbdb;
`;

export const userInfoAndBackButton = css`
    display: flex;
    width: 720px;
    margin: 0px auto;
    justify-content: space-between;
    padding: 22px 58px 16px 18px;
`

export const backButton = css`
    width: 40px;
    height: 40px;
    font-size: 40px;
    margin-right: -40px;
    margin-top: -20px;
    cursor: pointer;
    &:hover {
        color: red;
    }
    &:active {
        color: red;
    }
`;

export const profilemodifyButtonBox = css`
    width: 720px;
    margin: 0px auto;
    padding: 0px 20px 24px;
    
`;

export const profilemodifyButton = css`
    width: 100%;
    height: 40px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #E8E8E8;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #d2d2d2;
    }
    &:active {
        background-color: #bebebe;
    }
`;

export const profilemodifyButtonIcon = css`
    margin-right: 5px;
`;

export const settingView = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
`;

export const followSettingContainer = css` 
    margin: 10px auto 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

export const followSettingBox = css`
    width: 720px;
    padding: 15px 0px;
`;

export const followSettingButton = css`
    width: 100%;
    height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    border: none;
    background-color: white;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #dbdbdb;
    }
`;

export const followSetting = css`
    display: flex;
`;

export const followSettingIcon = css`
    margin: 1px 5px 0px 0px;
    font-size: 20px;
`;

export const alarmSettingIcon = css`
    margin: 0px 5px 5px 0px;
    font-size: 22px;
`;

export const Buttoncontainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    background-color: white;
`;

export const buttonBox = css`
    width: 720px; 
    padding: 15px 0px;
`;

export const button = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 46px; 
    padding: 0px 20px;
    background-color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #dbdbdb;
    }
`;

export const logoutUsername = css`
    font-size: 14px;
    color: green;
`;

export const footer = css`
    width: 720px;
    margin: 0px auto;
    padding: 24px 20px;
`;

export const componyBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 21px;
    margin-top: 15px;
    font-size: 12px;
`;

export const componyButton = css`
    height: 20px;
    padding: 0px;
    background-color: #f4f7f8;
    border: none;
    cursor: pointer;
`;