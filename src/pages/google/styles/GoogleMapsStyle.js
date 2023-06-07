import { css } from "@emotion/react";

export const whiteCancelButton = css`
    display: flex;
    align-items: center;
    background-color: white;
    border: none;
    font-size: 20px;
    margin: 10px 0px;
    cursor: pointer;
`;

export const placeInfo = css`
    text-align: center;
`;

export const title = css`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
`;

export const starScore = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const save = css`
    color: black;
    cursor: pointer;
    margin: 10px 0px;
    font-size: 14px;
    font-weight: 600;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #dbdbdb;
    }
`;

export const unSave = css`
    color: green;
    cursor: pointer;
    margin: 10px 0px;
    font-size: 14px;
    font-weight: 600;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #dbdbdb;
    }
`;

export const saveIcon = css`
    fill: black;
`;

export const unSaveIcon = css`
    fill: green;
`;

export const writeButton = css`
    margin-top: 10px;
    color: green;
    font-size: 15px;
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
        color: red;
    }
    &:active {
        color: red;
    }
`;