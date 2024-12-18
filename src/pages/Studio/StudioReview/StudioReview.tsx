/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { TypoCapSmR, TypoTitleXsM } from '@styles/Common';
import { useParams } from 'react-router-dom';
import StudioReviewImageList from './components/StudioReviewImageList';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import StudioReviewItem from './components/StudioReviewItem';
import StudioReviewCategories from './components/StudioReviewCategories';
import { IReviewImages } from 'types/types';
import { useQuery } from '@tanstack/react-query';

// 리뷰 데이터의 타입 정의
interface Review {
  content: string;
  created_at: string;
  id: number;
  imageExists: boolean;
  menuId: number;
  menuName: string;
  rating: number;
  reviewImages: IReviewImages[];
  updated_at: string;
  userId: number;
  userName: string;
}

/** 리뷰 페이지 (부모) */
const StudioReview = () => {
  const { _id } = useParams();

  const fetchStudioReviews = async () => {
    const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/${_id}/reviews`);
    if (!response.ok) {
      throw new Error('리뷰를 불러오는데 실패했습니다');
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['studioReviews', _id],
    queryFn: fetchStudioReviews,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 3,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  const { reviewList: reviewLists, totalImageNum, avgRating, totalReviewNum, samplePhotoList, menuNanmeList } = data;
  const processedAvgRating = avgRating.toFixed(1);

  return (
    <>
      <StudioNavigator _id={_id || ''} />
      <ReviewPhotosWrapperStyle>
        <ReviewTitleWrapperStyle>
          <h1 css={TypoTitleXsM}>리뷰 사진 모아보기</h1>
          <p css={TypoCapSmR}>{totalImageNum}개</p>
        </ReviewTitleWrapperStyle>
        <StudioReviewImageList pageId={_id} samplePhotoList={samplePhotoList} />
      </ReviewPhotosWrapperStyle>

      <StudioReviewCategories avgRating={processedAvgRating} totalReviewNum={totalReviewNum} menuNanmeList={menuNanmeList} />
      {reviewLists.map((review: Review) => (
        <StudioReviewItem key={review.id} review={review} />
      ))}
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
