import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./styles/PhotoCardUIStyle";
import { GiCancel } from "react-icons/gi";
import { BiXCircle } from "react-icons/bi";

const PhotoCardUI = ({ url, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      css={S.photoCardContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={url} alt="" css={S.photo} />
      {hovered && (
        <div css={S.overlay} >
          <BiXCircle size="75" color="red" css={S.removeBtn} onClick={onClick}/>
        </div>
      )}
      {/* <div css={S.photoBox}>
          </div> */}
    </div>
  );
};

export default PhotoCardUI;
