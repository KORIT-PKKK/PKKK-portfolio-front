import { css } from "@emotion/react";

export const buttonBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 335px;
    height: 38px;
    margin: 0px auto;
    margin-top: 18px;
    background-color: #E8E8E8;
    border-radius: 10px;
`;

export const button = css`
    border: 2px solid black;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    &:hover {
        background-color: #d2d2d2;
    }
    &:active {
        background-color: #bebebe;
    }
`;