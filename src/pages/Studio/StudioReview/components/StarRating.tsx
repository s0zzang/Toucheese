/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { TypoCapSmR } from '@styles/Common';
import variables from '@styles/Variables';

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <RatingWrapper>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} filled={index < rating}>
          {index < rating ? '★' : '★'}
        </Star>
      ))}
      <span css={TypoCapSmR}>{rating}</span>
    </RatingWrapper>
  );
};

export default StarRating;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span<{ filled: boolean }>`
  color: ${(props) => (props.filled ? `${variables.colors.primary}` : `${variables.colors.gray500}`)};
  font-size: 1.4rem;
`;
