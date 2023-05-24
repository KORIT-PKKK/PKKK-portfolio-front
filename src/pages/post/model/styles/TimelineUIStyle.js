import { css } from "@emotion/react";

export const container = css`
    margin: 0px auto;
    width: 720px;
    padding: 24px 14px 0px;
`;

export const month = css`
    font-size: 21px;
    font-weight: 600;
    margin: 0px 0px 10px 3px;
`;

export const reviewContainer = css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

export const reviewCard = css`
    width: 223.5px;
    height: 267px;
    margin: 3px;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    background-color: white;
`;


export const review = css`
    width: 200px;
    height: 28px;
    margin: 95px auto 72px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;


export const placeContainer = css`
    width: 200px;
    margin: 100px auto 0px;
`;

export const address = css`
    height: 18px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const place = css`
    height: 20px;
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

