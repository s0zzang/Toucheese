/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { TypoCapSmR, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import StarRating from './StarRating';
import ReviewContent from './ReviewContent';
import { useState } from 'react';

/** 리뷰 아이템 컴포넌트 */
/** Props 리뷰 타이틀, 제공여부?, 리뷰 내용 , 별점 , 사진 , 닉네임 , 날짜 */
const StudioReviewItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StudioReviewItemContainerStyle isOpen={isOpen}>
      <TitleWrapper>
        <MainTitle css={TypoTitleXsM}>프로필 A 반신 촬영</MainTitle>
        <SubTitle css={TypoCapSmR}>컷 추가 수정 | 포즈 추가 촬영</SubTitle>
      </TitleWrapper>
      <StarRating rating={3} />
      <SampleImageListStyle />
      <ReviewContent
        content="촬영 너무 잘 했습니다...촬영 너무 잘 했습니다...촬영 너무 잘 했습니다...촬영 너무 잘 했습니다...촬영 너무 잘 했습니다...촬영 너무 잘 했습니다...촬영 너무 잘 했습니다...촬영 너무 잘 했습니다"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <span>닉네임 오늘</span>
    </StudioReviewItemContainerStyle>
  );
};

export default StudioReviewItem;

const StudioReviewItemContainerStyle = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 36.7rem;
  margin-top: 1rem;
  border-bottom: 1px solid ${variables.colors.gray300};
  background-color: ${({ isOpen }) => (isOpen ? variables.colors.gray100 : 'transparent')};
  transition: background-color 0.2s ease;
`;

const SampleImageListStyle = styled.div`
  width: 100%;
  height: 11.8rem;
  background-color: #ddd;
`;
const TitleWrapper = styled.div`
  margin-bottom: 0.8rem;
`;

const MainTitle = styled.h3``;

const SubTitle = styled.p`
  font-size: 1.4rem;
  color: ${variables.colors.gray600};
`;
