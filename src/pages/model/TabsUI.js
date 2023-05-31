/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from './styles/TabsUIStyle';

const TabsUI = ({ onClick, selectPath }) => {

    return (
        <>
            <div css={S.menuBar}>
                <span css={[S.menu, (selectPath === "/feed" || selectPath === "/") && S.selectedMenu]} onClick={() => onClick('/feed')}>피드</span>
                <span css={[S.menu, selectPath === "/timeLine" && S.selectedMenu]} onClick={() => onClick('/timeLine')}>타임라인</span>
                <span css={[S.menu, (selectPath === "/fav" || selectPath === "/fav/post" || selectPath === "/fav/place") && S.selectedMenu]} onClick={() => onClick('/fav')}>즐겨찾기</span>
                <span css={[S.menu, selectPath === "/map" && S.selectedMenu]} onClick={() => onClick('/map')}>지도</span>
            </div>
        </>
    );
};

export default TabsUI;