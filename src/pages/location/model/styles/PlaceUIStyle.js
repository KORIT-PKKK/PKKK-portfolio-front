import { css } from "@emotion/react";

export const container = css`
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

export const wordConnection = css`
    margin: 0px 5px;
`;

export const saveButtonBox = css`
    border: none;
    background-color: white;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #dbdbdb;
    }
`;

export const unSaveButtonBox = css`
    border: none;
    background-color: white;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #dbdbdb;
    }
`;

export const saveIcon = css`
    fill: black;
    font-size: 25px;
`;


export const unSaveIcon = css`
    fill: green;
    font-size: 25px;
`;

export const save = css`
    color: black;
`;

export const unSave = css`
    color: green;
`;

export const locationDetailContainer = css`
    width: 720px;
    height: 20px;
    margin: 10px auto;
    display: flex;
    align-items: center;
`;

export const score = css`
    padding: 1px 6px;
`;