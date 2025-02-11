/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { TypoCapSmR } from '@styles/Common';
import { css } from '@emotion/react';
interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <RatingWrapper>
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon key={index} filled={index < rating}>
          <img
            src={index < rating ? '/img/icon-rating.svg' : '/img/icon-star-notfilled.svg'}
            alt={index < rating ? '채워진 별' : '빈 별'}
            width="14"
            height="14"
          />
        </StarIcon>
      ))}
      <span
        css={css`
          font: ${TypoCapSmR};
          margin-left: 0.2rem;
        `}
      >
        {rating}
      </span>
    </RatingWrapper>
  );
};

export default StarRating;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;
`;

const StarIcon = styled.span<{ filled: boolean }>`
  display: inline-flex;
  align-items: center;
  margin-right: 2px;

  img {
    width: 14px;
    height: 14px;
  }
`;
