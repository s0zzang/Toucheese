/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { TypoCapSmR, TypoTitleXsM } from '@styles/Common';
import { useParams } from 'react-router-dom';
import StudioReviewImageList from './components/StudioReviewImageList';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import StudioReviewItem from './components/StudioReviewItem';
import StudioReviewCategories from './components/StudioReviewCategories';

/** 리뷰 페이지 (부모) */
const StudioReview = () => {
  const { _id } = useParams();

  return (
    <>
      <StudioNavigator _id={_id || ''} />
      <ReviewPhotosWrapperStyle>
        <ReviewTitleWrapperStyle>
          <h1 css={TypoTitleXsM}>리뷰 사진 모아보기</h1>
          <p css={TypoCapSmR}>789개</p>
        </ReviewTitleWrapperStyle>
        <StudioReviewImageList PageId={_id || ''} />
      </ReviewPhotosWrapperStyle>

      <StudioReviewCategories />

      <StudioReviewItem />
    </>
  );
};

export default StudioReview;

const ReviewPhotosWrapperStyle = styled.div`
  width: 100%;
  margin-top: 2.2rem;
`;

const ReviewTitleWrapperStyle = styled.div`
  display: flex;
  gap: 0.8rem;

  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
