import { css } from "@emotion/react";

export const header = css`
    display: flex;
    height: 57px;
`;

export const backButton = css`
    width: 42px;
    height: 57px;
    padding: 17px 8px 11px 18px;
    font-size: 18px;
    background-color: white;
    border: none;
    cursor: pointer;
`;

export const headerTitle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
`;

export const infoModifyBox = css`
    width: 720px;
    margin: 0px auto;
    padding: 0px 20px 70px;
`;

export const photoBox = css`
    width: 90px;
    height: 90px;
    margin: auto;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

export const overlay = css`
    position: absolute;
    top: 57px;
    width: 90px;
    height: 90px;
    background-color: green;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.6;
    transition: opacity 0.3s;
`;

export const inputLabel = css`
    margin: 25px 0px 7px;
    font-size: 14px;
    font-weight: 600;
`;

export const nickNameInput = css`
    width: 100%;
    height: 50px;
    padding: 0px 15px;
    border: none;
    border-radius: 10px;
    background-color: #f4f7f8;
`;

export const nickNameState = css`
    display: flex;
    justify-content: space-between;
    height: 36px;
    margin-top: 7px;
    font-size: 13px;
`;

export const introduceInput = css`
    width: 100%;
    height: 120px;
    padding: 15px;
    border: none;
    border-radius: 10px;
    background-color: #f4f7f8;
`;

export const introduceState = css`
    display: flex;
    justify-content: flex-end;
    height: 36px;
    margin-top: 7px;
    font-size: 13px;
`;

export const saveBox = css`
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: 720px;
    height: 70px;
    padding: 10px 20px;
`;

export const saveButton = css`
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: green;
    color: white;
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
`;