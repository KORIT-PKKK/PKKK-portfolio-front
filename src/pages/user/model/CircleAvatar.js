/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { BiXCircle } from "react-icons/bi";
import * as S from "../styles/UserUpdateViewStyle"

const CircleAvatar = ({ url }) => {
    const [hovered, setHovered] = useState(false);
  
    const handleMouseEnter = () => {
      setHovered(true);
    };
  
    const handleMouseLeave = () => {
      setHovered(false);
    };
  
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={url} alt="" css={S.photoBox} />
        {hovered && (
          <div css={S.overlay} >
            <BiXCircle size="75" color="red"/>
          </div>
        )}
      </div>
    );
  };
  
  export default CircleAvatar;