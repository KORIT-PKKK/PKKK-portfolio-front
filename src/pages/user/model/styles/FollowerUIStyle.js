const { css } = require("@emotion/react");

export const container = css`
    margin-top: 10px;
    border-top: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
`;

export const title = css`
    width: 720px;
    height: 51px;
    margin: 0px auto;
    padding: 15px 20px;
    font-size: 15px;
    font-weight: 600;
`;

export const userBox = css`
    width: 720px;
    height: 76px;
    display: flex;
    align-items: center;
    margin: 0px auto;
    padding: 20px 20px 20px 25px;
`;

export const photoBox = css`
    width: 36px;
    height: 36px;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
`;


export const username = css`
    width: 524px;
    font-size: 17px;
    font-weight: 600;
    margin: 0px 0px 5px 12px;
`;

export const stateButton = css`
    width: 70px;
    height: 30px;
    background-color: red;
    border: none;
    border-radius: 5px;
    font-size: 13px;
    cursor: pointer;
`;