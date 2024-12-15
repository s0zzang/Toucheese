/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { TypoCapSmR, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import StarRating from './StarRating';

const StudioReviewItem = () => {
  return (
    <StudioReviewItemContainerStyle>
      <TitleWrapper>
        <MainTitle css={TypoTitleXsM}>프로필 A 반신 촬영</MainTitle>
        <SubTitle css={TypoCapSmR}>컷 추가 수정 | 포즈 추가 촬영</SubTitle>
      </TitleWrapper>
      <StarRating rating={4} />
      <SampleImageListStyle />
      <ReviewContent>촬영 너무 잘 했습니다. 사진도 잘 나왔고 스튜디오도 깨끗하고 좋았어요!</ReviewContent>
    </StudioReviewItemContainerStyle>
  );
};

export default StudioReviewItem;

const StudioReviewItemContainerStyle = styled.div`
  width: 100%;
  margin-top: 1rem;
  background-color: ${variables.colors.gray100};
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

const ReviewContent = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;
