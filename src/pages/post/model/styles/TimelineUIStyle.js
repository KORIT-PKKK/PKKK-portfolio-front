import { css } from "@emotion/react";

export const feed = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 720px;
    height: 100%;
    margin: 20px auto 0px;
    background-color: white;
    border: 1px solid #dbdbdb;
`;

export const header = css`
    display: flex;
    align-items: center;
    width: 680px;
    height: 42px;
    margin-bottom: 20px;
`;

export const date = css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
`;

export const iconContainer = css`
    display: flex;
    font-size: 20px;
`;

export const icon = css`
    margin: 0px 5px;
    cursor: pointer;
    &:hover{
        background-color: #dbdbdb;
    }
`;

export const main = css`
    width: 680px;
    height: 439px;
    cursor: pointer;
`;

export const blank = css`
    width: 680px;
    height: 0px;
`;

export const responsiveImage = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const blankWrapper = css`

`;

export const wrapper1 = css`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 400px);
    grid-template-areas: 
    "box1";
`;

export const wrapper2 = css`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 400px);
    grid-template-areas: 
    "box1 box2";
`;

export const wrapper3 = css`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 200px);
    grid-template-areas: 
    "box1 box1 box1 box2 box2"
    "box1 box1 box1 box3 box3";
`;

export const box1 = css`
    grid-area: box1;
`;

export const box2 = css`
    grid-area: box2;
`;

export const box3 = css`
    grid-area: box3;
`;

export const detail = css`
    border: 1px solid #dbdbdb;
    width: 680px;
    height: auto;
    margin: 5px 0px 5px 0px;
    padding: 15px 20px 15px 20px;    
`;

export const footer = css`
    border: 1px solid #dbdbdb;
    display: flex;
    width: 680px;
    height: 66px;
    margin: 5px 0px 0px 0px;
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
    width: 50px;
    height: 42px;
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
    fill: black;
`;

export const placeUnSaveIcon = css`
    fill: green;
`;


export const placeSaveDetail = css`
    font-size: 11px;
    color: black;
`;

export const placeUnSaveDetail = css`
    font-size: 11px;
    color: green;
`;