import React from 'react';
import emptyStar from '../post/model/assets/icon_empty_star.svg';
import fullStar from '../post/model/assets/icon_full_star.svg';
import halfStar from '../post/model/assets/icon_half_star.svg';


const RatingScoreUI = ({ rating }) => {
  const starCount = Math.floor(rating);
  const isHalfOver = rating % 1 !== 0;

  return (
    <div className="w-10/12 max-w-md space-y-6 rounded-lg bg-slate-50 px-3 py-6 text-slate-800 shadow-lg">

      <div className="flex justify-center" style={{ display:'flex', alignItems:'center'}}>
        <div className="flex w-fit rounded-lg border-2 bg-slate-300 py-2 px-1" >
          {Array(5)
            .fill(0)
            .map((_, index) => {
              if (isHalfOver && starCount === index) {
                return (
                  <img
                    key={index}
                    src={isHalfOver ? halfStar : fullStar}
                    style={{ width: '30px', height: '30px' }}
                    alt="star_image"
                  />
                );
              }

              return (
                <img
                  key={index}
                  src={index < starCount ? fullStar : emptyStar}
                  style={{ width: '30px', height: '30px' }}
                  alt="star_image"
                />
              );
            })}
        </div>
        <span className="rating" style={{ marginLeft:'5px'}}>({rating})</span>  
      </div>
    </div>
  );
};
export default RatingScoreUI;