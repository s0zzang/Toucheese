/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TypoCapXsR } from '@styles/Common';
import variables from '@styles/Variables';

const RatingReview = ({ ratingValue = 0 }) => {
  let ratingComment = '';

  switch (ratingValue) {
    case 1:
      ratingComment = '별로였어요.';
      break;
    case 2:
      ratingComment = '그저 그랬어요.';
      break;
    case 3:
      ratingComment = '괜찮았어요.';
      break;
    case 4:
      ratingComment = '좋았어요.';
      break;
    case 5:
      ratingComment = '최고였어요!';
      break;
    default:
      ratingComment = '촬영은 어떠셨나요? 사진관 이용 리뷰를 남겨주세요.';
      break;
  }

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
  border-top: 1px solid ${variables.colors.gray300};
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
