/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { TypoCapSmR, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';

import StarRating from './StarRating';
import ReviewContent from './ReviewContent';
import { useState } from 'react';
import ImageSwiper from '@components/ImageSwiper/ImageSwiper';
import { formatTimeAgo } from '@utils/formatTimeAgo';
import { IReviewImages } from 'types/types';

// 리뷰 데이터의 타입 정의
interface Review {
  content: string;
  created_at: string;
  id: number;
  imageExists: boolean;
  menuId: number;
  menuName?: string;
  rating: number;
  reviewImages: IReviewImages[];
  updated_at: string;
  userId: number;
  userName: string;
}

/** 리뷰 아이템 컴포넌트 */
const StudioReviewItem = ({ review }: { review: Review }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StudioReviewItemContainerStyle key={review.id} isOpen={isOpen}>
        <TitleWrapper>
          <MainTitle css={TypoTitleXsM}>{review.menuName || '메뉴 이름 없음'}</MainTitle>
          <SubTitle css={TypoCapSmR}>컷 추가 수정 | 포즈 추가 촬영</SubTitle>
        </TitleWrapper>
        <StarRating rating={review.rating} />
        <ImageSwiper
          images={review.reviewImages}
          imgprops={{
            loading: 'lazy',
            onLoad: (e) => {
              const img = e.target as HTMLImageElement;
              img.setAttribute('cache-control', 'max-age=31536000');
            },
          }}
        />
        <ReviewContent content={review.content} isOpen={isOpen} setIsOpen={setIsOpen} />
        <NameAndDateWrapperStyle>
          <span>{review.userName}</span>
          <p>{formatTimeAgo(review.created_at)}</p>
        </NameAndDateWrapperStyle>
      </StudioReviewItemContainerStyle>
    </>
  );
};

export default StudioReviewItem;

const StudioReviewItemContainerStyle = styled.div<{ isOpen: boolean }>`
  width: 100%;

  margin-top: 1rem;
  border-bottom: 1px solid ${variables.colors.gray300};
  background-color: ${({ isOpen }) => (isOpen ? variables.colors.gray100 : 'transparent')};
  transition: background-color 0.2s ease;
`;

const NameAndDateWrapperStyle = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
  display: flex;
  gap: 1.1rem;
  align-items: center;
  color: ${variables.colors.gray800};

  & p {
    font-size: 1.4rem;
    color: ${variables.colors.gray600};
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 0.8rem;
`;

const MainTitle = styled.h3`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;

  &::after {
    content: '';
    display: block;
    width: 1.6rem;
    height: 1.6rem;
    background-image: url('/img/icon-arrow-16.svg');
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const SubTitle = styled.p`
  font-size: 1.4rem;
  color: ${variables.colors.gray600};
`;
