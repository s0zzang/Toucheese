/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TypoCapXsR } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';

const RatingReview = ({ ratingValue = 0 }) => {
  const [ratingComment, setRatingComment] = useState(
    '촬영은 어떠셨나요? 사진관 이용 리뷰를 남겨주세요.',
  );

  useEffect(() => {
    switch (ratingValue) {
      case 1:
        setRatingComment('별로였어요.');
        break;
      case 2:
        setRatingComment('그저 그랬어요.');
        break;
      case 3:
        setRatingComment('괜찮았어요.');
        break;
      case 4:
        setRatingComment('좋았어요.');
        break;
      case 5:
        setRatingComment('최고였어요!');
        break;
    }
  }, [ratingValue]);

  return (
    <div css={CardRatingStar}>
      <p>{ratingComment}</p>
      <div className="ratingBox">
        {Array.from({ length: 5 }).map((_, i) => (
          <img
            key={i}
            src={`/img/icon-rating${i < ratingValue ? '.svg' : '-disabled.svg'}`}
            alt={i < ratingValue ? '평가됨' : '미평가'}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingReview;

const CardRatingStar = css`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border-top: 0.1rem solid ${variables.colors.gray300};
  padding-top: 1rem;

  & p {
    ${TypoCapXsR}
    color: ${variables.colors.gray800};
  }

  .ratingBox {
    display: flex;
    gap: 0.2rem;
  }
`;
