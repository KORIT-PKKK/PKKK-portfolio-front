const { css } = require("@emotion/react");

export const headerBox = css`
    display: flex;
    align-items: center;
    margin: 0px auto;
    width: 540px;
    height: 62px;
    padding: 21px 0px;
`; 

export const backButton = css`
    width: 62px;
    height: 62px;
    font-size: 30px;
    font-weight: 100;
    background-color: white;
    border: none;
    padding: 0px;
    cursor: pointer;
`;

export const logoBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    margin: 14px 0px 11px;
    font-size: 30px;
    font-weight: 600;
`;

export const logo = css`
    cursor: pointer;
`;

export const loginInputContainer = css`
    width: 540px;
    margin: 80px auto 0px;
    padding: 0px 20px;
`

export const nickNameinputBox = css`
    display: flex;
    align-items: center;
    width: 500px;
    height: 52px;
`;

export const passwordinputBox = css`
    display: flex;
    align-items: center;
    width: 500px;
    height: 52px;
`;

export const inputIcon = css`
    font-size: 20px;
    margin-left: -480px;
    z-index: 99;
`;


export const nickNameInput = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 52px;
    padding: 15px 35px 15px 50px;
    border: 1px solid #dbdbdb;
    border-bottom: none;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    &:focus{
        border: 1px solid green;
        outline: none;
    }
`;

export const passwordInput = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 52px;
    padding: 15px 35px 15px 50px;
    border: 1px solid #dbdbdb;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    &:focus{
        border: 1px solid green;
        outline: none;
    }
`; 

export const loginButtonBox = css`
    margin: 14px auto 0px;
    width: 500px;
    height: 54px;
`;

export const loginButton = css`
    width: 100%;
    height: 100%;
    padding: 14px 0px 13px;
    border: none;
    border-radius: 10px;
    background-color: green;
    font-size: 18px;
    font-weight: 600;
    color: white;
    cursor: pointer;
`;

export const registerBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    padding-top: 60px;
`;

export const registerButton = css`
    background-color: white;
    border: none;
    padding: 0px;
    font-size: 14px;
    cursor: pointer;
`;

export const wordSeparation = css`
    margin: 0px 6px 2px 6px;
    font-size: 12px;
`;

export const footer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 81px;
    padding: 34px 0px 30px 0px;
`;

export const componyButton = css`
    background-color: white;
    border: none;
    padding: 0px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`;
export const centerButton = css`
    background-color: white;
    border: none;
    padding: 0px;
    font-size: 13px;
    cursor: pointer;
`;

