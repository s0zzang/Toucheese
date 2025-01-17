/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TypoBodyMdR } from '@styles/Common';
import variables from '@styles/Variables';
import { useState } from 'react';

const StarInput = () => {
  const [starState, setStarState] = useState<number[]>([0, 0, 0, 0, 0]);

  const getRatingText = (stars: number[]) => {
    const count = stars.filter((s) => s === 1).length;
    switch (count) {
      case 1:
        return '별로였어요';
      case 2:
        return '그저 그랬어요';
      case 3:
        return '괜찮았어요';
      case 4:
        return '좋았어요';
      case 5:
        return '최고였어요!';
      default:
        return '별점을 입력해주세요';
    }
  };

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      {starState.map((star, index) => (
        <img
          key={index}
          src={star === 1 ? '/img/icon-star-filled.svg' : '/img/icon-star-notfilled.svg'}
          alt="별점"
          css={css`
            margin-right: 5px;
            cursor: pointer;
            transition: transform 0.2s ease;
            &:hover {
              transform: scale(1.2);
            }
            &:active {
              transform: scale(0.9);
            }
          `}
          onClick={() => {
            const newStarState = Array(5)
              .fill(0)
              .map((_, i) => (i <= index ? 1 : 0));
            setStarState(newStarState);
          }}
        />
      ))}
      <span
        css={css`
          ${TypoBodyMdR}
          color: ${variables.colors.gray600};
        `}
      >
        {getRatingText(starState)}
      </span>
    </div>
  );
};

export default StarInput;
