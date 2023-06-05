const { css } = require("@emotion/react");

export const requestLoginContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 20px;
`;

export const requestLoginBox = css`
    width: 720px;
    height: 449px;
    padding: 34px 30px 40px;
`;

export const flagIcon = css`
    font-size: 19px;
    margin: 0px 50% 15px;
`;

export const announcement = css`
    height: 27px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
`;

export const loginMessage = css`
    margin-top: 5px;
    height: 23px;
    font-size: 15px;
    text-align: center;
`;

export const loginPhotoBox = css`
    height: 163px;
    margin-top: 27px;
`;

export const loginButtonBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 22px;
    height: 46px;
`

export const loginButton = css`
    height: 100%;
    padding: 9px 10px;
    border: 1px solid #dbdbdb;
    border-radius: 20px;
    background-color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #dbdbdb;
    }
`;