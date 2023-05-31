import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./styles/PhotoCardUIStyle";
import { BiPlusCircle } from "react-icons/bi";

const EmptyBox = ({ onClick }) => {
  return (
    <>
      <div css={S.photoCardContainer}>
        <BiPlusCircle size={75} css={S.addBtn} onClick={onClick}/>
      </div>
    </>
  );
};

export default EmptyBox;
