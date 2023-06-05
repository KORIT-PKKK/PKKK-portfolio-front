import { css } from "@emotion/react";

export const placeContainer = css`
    border: 1px solid #dbdbdb;
    display: flex;
    width: 680px;
    height: 66px;
    margin: 30px auto;
    padding: 12px 20px 12px 20px;
`;

export const place = css`
    width: 593px;
    height: 20px;
    cursor: pointer;
`;

export const placeDetail = css` 
    display: flex;
    margin: 0px 0px 7px 0px;
`;

export const placeWordConnection = css`
    margin: 0px 7px
`;

export const favorites = css`
    display: flex;
    text-align: right;
    width: 39px;
    height: 39px;
`;

export const placeUnSaveButton = css`
    background-color: white;
    border: 1px solid white;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: rgba(255, 0, 0, 0.3);
    }
    &:active {
        background-color: rgba(255, 0, 0, 0.5);
    }
`;

export const placeUnSaveIcon = css`
    fill: red;
`;

export const placeUnSaveDetail = css`
    font-size: 11px;
    color: red;
`;