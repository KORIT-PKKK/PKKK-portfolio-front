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