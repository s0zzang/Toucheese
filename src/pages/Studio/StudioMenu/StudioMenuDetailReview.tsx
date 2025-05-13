/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import StudioReviewItem, { Review } from '../StudioReview/components/StudioReviewItem';
import { breakPoints, mqMin } from '@styles/BreakPoint';

const StudioMenuDetailReview = ({
  reviewItem = [],
  rating = 0,
}: {
  reviewItem: Review[];
  rating: number;
}) => {
  const reviewList = reviewItem.map((item, i) => (
    <StudioReviewItem
      key={item.id}
      review={item}
      showMenuName={true}
      isLast={i === reviewItem.length - 1}
    />
  ));

  return (
    <>
      <div css={ReviewrapperStyle}>
        <section css={ReviewHead}>
          <div className="reviewRating">
            <img src="/img/icon-rating.svg" alt="평점 아이콘" />
            <span>{Math.trunc(rating * 10) / 10}</span>
          </div>
          <p>{reviewItem.length}개의 리뷰</p>
        </section>
        <section css={ReviewList}>{reviewList}</section>
      </div>
    </>
  );
};

export default StudioMenuDetailReview;

const ReviewrapperStyle = css`
  display: flex;
  flex-direction: column;
`;

const ReviewHead = css`
  /* box-shadow: inset 0 0 10px saddlebrown; */
  margin-top: 2.4rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  .reviewRating {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
`;
const ReviewList = css`
  display: flex;
  flex-direction: column;
  ${mqMin(breakPoints.pc)} {
    width: 100%;
  }
`;
