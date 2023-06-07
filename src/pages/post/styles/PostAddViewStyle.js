import { css } from "@emotion/react";

export const postContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 26px 20px 28px;
    width: 720px;
    margin: 10px auto;
    background-color: white;
    border: 1px solid #dbdbdb;
`;

export const post = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 20px;
`;

export const footer = css`
    border: 1px solid #dbdbdb;
    display: flex;
    width: 678px;
    height: 66px;
    padding: 13px 16px 12px 15px;
    margin-bottom: 10px;
`;

export const place = css`
    width: 593px;
`;

export const placeDetail = css` 
    display: flex;
`;

export const placeTitle = css`
    display: flex;
    margin-bottom: 10px;
`;

export const placeTimeDate = css`
    margin-left: 10px;
`;

export const detailContainer = css`
  display: flex;
`;

export const detail = css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 12px;
`;

export const wordConnection = css`
  margin: 0px 10px;
`;

export const mainContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
`;

export const mainStarCheck = css`
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 30px;
    font-weight: 600;
`;

export const starScore = css`
    display: flex;
    cursor: pointer;
    margin: 20px 0px 50px 0px;
`;

export const mainPicture = css`
    width: 600px;
    height: 300px;
    margin-bottom: 20px;
    border: 1px solid #dbdbdb;
`;


export const mainTextLabel = css`
`;

export const mainTextInputContainer = css`
  /* position: relative; */
`;

export const mainTextButton = css`
  border: 3px solid #dbdbdb;
  background-color: white;
  margin-top: 4px;
  margin-left: 5px;
  font-size: 25px;
  cursor: pointer;
  
  &:hover {
    background-color: #fafafa;
  }
  
  &:active {
    background-color: #dbdbdb;
  }
`;
export const mainTextInput = css`
  width: 600px;
  height: 120px;
  padding: 20px 8px 5px 8px;
  resize: none; /* 크기 조정 비활성화 */
  font-size: 15px;
  overflow-y: auto; /* 수직 스크롤바 표시 */

  &::-webkit-scrollbar {
    width: 5px; /* 스크롤바 너비 설정 */
    background-color: #f5f5f5; /* 배경색 설정 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #dbdbdb; /* 스크롤바 색상 설정 */
    border-radius: 3px; /* 스크롤바 모서리 반경 설정 */
  }
`;

export const error = css`
  margin: 7px 0px;
  color: red;
  font-size: 12px;
`;

export const wordCountContainer = css`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
  font-size: 15px;
`;

export const mainTextContainer = css`
  /* position: absolute;
  top: 0;
  right: 2.5px;
  display: flex;
  align-items: flex-start; /* 수정: 상단 정렬로 변경 */
  /* justify-content: flex-end;
  height: 100%; */ 
`;

