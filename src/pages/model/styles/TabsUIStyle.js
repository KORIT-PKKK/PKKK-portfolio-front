import { css } from "@emotion/react";

export const menuBar = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 375px;
    margin: 0px auto;
    height: 51px;
`;

export const menu = css`
    padding: 14px 5px;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #dbdbdb;
    }
`;


export const selectedMenu = css`
    border-bottom: 2px solid red;
`;