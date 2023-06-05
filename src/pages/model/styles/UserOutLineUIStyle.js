import { css } from "@emotion/react";

export const userInfoBox = css`
    flex-direction: column;
`;

export const userInfo = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const userInfoLeft = css`
    width: 64px;
    height: 69px;
    margin-right: 23px;
`;

export const profileBox = css`
    position: relative;
    overflow-y: hidden;
    border: 1px solid black;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    cursor: pointer;
`;

export const profilePhoto = css`
    width: 100%;
    height: 100%;
`;

export const usernameBox = css`
    display: flex;
    width: 248px;
    height: 26px;
    font-size: 20px;
    font-weight: 600;
`;

export const username = css`
    cursor: pointer;
`;

export const shareButton = css`
    border: none;
    background-color: #dbdbdb;
    padding: 0px;
    width: 22px;
    height: 22px;
    margin-left: 8px;
    cursor: pointer;
`;

export const Buttons = css`
    margin-top: 7px;
    width: 248px;
    height: 39px;
`;

export const userOutLineButton = css`
    text-align: center;
    border: none;
    background-color: white;
    cursor: pointer;
    font-size: 16px;
    &:hover {
        background-color: #d2d2d2;
    }
    &:active {
        background-color: #bebebe;
    }
`;

export const count = css`
    display: flex;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
`;