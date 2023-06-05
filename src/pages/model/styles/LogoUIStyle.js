import { css } from "@emotion/react";

export const logoBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 18px 8px 15px;
    border-bottom: 1px solid #dbdbdb;
`;

export const logoButtons = css`
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #dbdbdb;
    }
`;

export const logo = css`
    width: 31px;
    height: 36px;
    padding: 8px 5px 7px;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

export const pageName = css`
    height: 36px;
    padding: 11px 2px 5px;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

export const menuButton = css`
    width: 38px;
    height: 36px;
    margin: 0px -10px 0px 0px;
    padding: 10px;
    border: none;
    background-color: white;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #dbdbdb;
    }
`;