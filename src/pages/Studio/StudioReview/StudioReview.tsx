/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { TypoCapSmR, TypoTitleXsM } from '@styles/Common';
import { useParams } from 'react-router-dom';
import StudioReviewImageList from './components/StudioReviewImageList';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import StudioReviewItem from './components/StudioReviewItem';
import StudioReviewCategories from './components/StudioReviewCategories';
import { useEffect, useState } from 'react';

// 리뷰 데이터의 타입 정의
interface Review {
  content: string;
  created_at: string;
  id: number;
  imageExists: boolean;
  menuId: number;
  menuName: string;
  rating: number;
  reviewImages: string[];
  updated_at: string;
  userId: number;
  userName: string;
}

/** 리뷰 페이지 (부모) */
const StudioReview = () => {
  const { _id } = useParams();
  // 전체 리뷰 데이터
  const [reviewLists, setReviewLists] = useState<Review[]>([]);
  // 전체 이미지 개수
  const [totalImageNum, setTotalImageNum] = useState(0);
  // 평균 별점
  const [avgRating, setAvgRating] = useState(0);
  // 전체 리뷰 갯수
  const [totalReviewNum, setTotalReviewNum] = useState(0);

  const fetchStudioReviews = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/${_id}/reviews`);
      if (!response.ok) {
        throw new Error('리뷰를 불러오는데 실패했습니다');
      }
      const data = await response.json();
      console.log('전체 리뷰 데이터 : ', data);
      setReviewLists(data.reviewList);
      setTotalImageNum(data.totalImageNum);
      const processedAvgRating = data.avgRating.toFixed(1); // 소수점 1의 자리 까지
      setAvgRating(processedAvgRating);
      setTotalReviewNum(data.totalReviewNum);
    } catch (error) {
      console.error('리뷰 조회 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchStudioReviews();
  }, []);

  return (
    <>
      <StudioNavigator _id={_id || ''} />
      <ReviewPhotosWrapperStyle>
        <ReviewTitleWrapperStyle>
          <h1 css={TypoTitleXsM}>리뷰 사진 모아보기</h1>
          <p css={TypoCapSmR}>{totalImageNum}개</p>
        </ReviewTitleWrapperStyle>
        <StudioReviewImageList PageId={_id} />
      </ReviewPhotosWrapperStyle>

      <StudioReviewCategories avgRating={avgRating} totalReviewNum={totalReviewNum} />
      {reviewLists.map((review) => (
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
