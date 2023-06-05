import { css } from "@emotion/react";

export const container = css`
    height: 83px;
    padding: 12px 24px 20px;
    border-bottom: 1px solid #dbdbdb;
`;

export const buttonBox = css`
    width: 720px;
    margin: 0px auto;
    display: flex;
    justify-content: space-between;
`;

export const placeButtonBox = css`
    width: 658px;
    height: 100%;
    border: none;
    background-color: white;
`;

export const placeName = css`
    height: 30px;
    font-size: 23px;
    font-weight: 600;
    text-align: left;
`;

export const address = css`
    display: flex;
    height: 17px;
    margin-top: 4px;
    font-size: 14px;
`;

export const placeSaveButton = css`
    background-color: white;
    border: 1px solid white;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #dbdbdb;
    }
`;

export const placeUnSaveButton = css`
    background-color: white;
    border: 1px solid white;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #dbdbdb;
    }
`;

export const placeSaveIcon = css`
    font-size: 30px;
    fill: black;
`;

export const placeUnSaveIcon = css`
    font-size: 30px;
    fill: green;
`;


export const placeSaveDetail = css`
    font-size: 13px;
    color: black;
`;

export const placeUnSaveDetail = css`
    font-size: 13px;
    color: green;
`;