import React, { useState } from 'react';
import emptyStar from './assets/icon_empty_star.svg';
import fullStar from './assets/icon_full_star.svg';
import halfStar from './assets/icon_half_star.svg';
import { useEffect } from 'react';


const RatingUI = ({ onRatingChange }) => {
  const [starCount, setStarCount] = useState(0);
  const [isHalfOver, setIsHalfOver] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const commentMap = {
    0:'(0.0)',
    0.5: '(0.5)',
    1: '(1.0)',
    1.5: '(1.5)',
    2: '(2.0)',
    2.5: '(2.5)',
    3: '(3.0)',
    3.5: '(3.5)',
    4: '(4.0)',
    4.5: '(4.5)',
    5: '(5.0)',
  };

  const handleMouseMove = (e) => {
    if (isClicked) return;
    const target = e.target;
    setStarCount(Number(target.dataset.star));

    const rect = target.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const checkHalf = xPos > rect.width / 2;
    setIsHalfOver(checkHalf);
  };

  const handleMouseLeave = () => {
    if (isClicked) return;
    setStarCount(0);
  };

  const handleClick = (e) => {
    setIsClicked((prev) => !prev);
  };

  const getFinalScore = () => {
    if (isHalfOver) {
      return starCount;
    }
    return starCount - 0.5;
  };

  useEffect(() => {
    onRatingChange(getFinalScore());
  }, [onRatingChange, getFinalScore()]);

  return (
    <div className="w-10/12 max-w-md space-y-6 rounded-lg bg-slate-50 px-3 py-6 text-slate-800 shadow-lg">
      <header>
        <h2 className="text-center text-xl font-bold"/>
      </header>

      <div className="flex justify-center">
        <div
          className={`flex w-fit rounded-lg border-2 bg-slate-300 py-2 px-1 
          ${isClicked && 'border-yellow-400'}`}
        >
          {Array(5).fill(0).map((_, index) => {
              if (starCount === index + 1) {
                return (
                  <img
                    key={index}
                    src={isHalfOver ? fullStar : halfStar}
                    data-star={index + 1}
                    style={{ width: '30px', height: '30px' }}
                    onClick={handleClick}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    alt="star_image"
                  />
                );
              }

              return (
                <img
                  key={index}
                  src={starCount > index + 1 ? fullStar : emptyStar}
                  data-star={index + 1}
                  style={{ width: '30px', height: '30px' }}
                  onClick={handleClick}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  alt="star_image"
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RatingUI;
// /** @jsxImportSource @emotion/react */
// import React, { useEffect, useState } from 'react';
// import * as S from './styles/RatingUIStyle';
// import RatingUI from './RatingUI';


// const RatingUI = () => {
//   const AvrRate = 10; // 상품 평균 평점 (데이터패치할때 사용)

//   // 다섯개의 별을 따로 컨트롤하기 위해서는 고유 id를 각각 가지고
//   // 이 고유 아이디를 쉽게 생성해 주기 위한 리스트
//   const StarIndList = ['first', 'second', 'third', 'fourth', 'last'];
//   // 별점 리스트 상태
//   const [ratesResList, setRatesResList] = useState([0, 0, 0, 0, 0]);
//   const [ selectedScore, setSelectedScore ] = useState(0);
//     const calcStarRates = () => {
//         // 임시 리스트.
//         let tempStarRatesArr = [0, 0, 0, 0, 0];
//         // 별 한 개 당 width가 14이므로 총 70. 100점 만점인 현재와 비율을 맞추기
//         let starVerScore = (AvrRate * 70) / 100;
//         let idx = 0;
//         // 14를 starVerScore에서 하나씩 빼가면서 별 하나하나에 채워질 width를 지정해줍니다. 다 채워지지 않을 인덱스의 별은 아래 tempStarRatesArr[idx] = starVerScore; 에서 채워줌
//         while (starVerScore > 14) {
//           tempStarRatesArr[idx] = 14;
//           idx += 1; // 인덱스 0부터 첫번째 별 입니다.
//           starVerScore -= 14;
//         }
//         tempStarRatesArr[idx] = starVerScore;
//         return tempStarRatesArr;// 평균이 80이라면 [14, 14, 14, 14, 0]이될거임
//       };
//     useEffect(() => {
//         // 별점 리스트는 첫 렌더링 때 한번만 상태를 설정해줌
//         setRatesResList(calcStarRates());
//     }, [selectedScore])

//     const handleStarClick = (score) => {
//       setSelectedScore(score);
//     };

//   return (
//     <>
//     <div>
//       <div css={S.StarRateWrap}>
//         {StarIndList.map((item, idx) => {
//           const score = idx + 1;
//           return (
//             <span
//               className='star_icon'
//               key={`${item}_${idx}`}
//               onClick={() => handleStarClick(score)}
//             >
//               {console.log("1:", score)}
//               <svg xmlns='http://www.w3.org/2000/svg' width='40' height='39' viewBox='0 0 14 13' fill='#cacaca'>
//               {/* id는 별 하나하나 마다 다른 값을 가지고 있어야 한다 */}
//                 {/* 새로 생성한 리스트에서 별 길이를 넣어준다. */}
//                 <clipPath id={`${item}StarClip`}>
//                   <rect width={`${ratesResList[idx]}`} height='39' />
//                 </clipPath>
//                 <path
//                   id={`${item}Star`}
//                     d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
//                     transform='translate(-2 -2)'
//                 />
//                 <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='gold'/>
//               </svg>
//             </span>
//         )})
//           }
//       </div>
//     </div>
//     </>
//   );
// };

// export default RatingUI;