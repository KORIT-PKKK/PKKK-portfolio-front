import { css } from "@emotion/react";

export const photoCardContainer = css`
    position: relative;
    width: 150px;
    height: 150px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

export const overlay = css`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
    opacity: 0.6;
    transition: opacity 0.3s;
`;

export const addBtn = css`
    position: absolute;
    cursor: pointer;
`;

export const removeBtn = css`
    position: absolute;
    cursor: pointer;
`;

export const cancelButton = css`
    height: 20px;
    margin-bottom: 10px;
    background-color: white;
    border: none;
    text-align: right;
    font-size: 20px;
    cursor: pointer;
`;

export const cancelIcon = css`
    fill: red;
`;

export const photoBox = css`
    width: 100%;
    height: 100%;
    overflow-y: hidden;
`;

export const photo = css`
    width: 100%;
    height: 180px;
    opacity: 1;
    transition: opacity 0.3s;
`;
