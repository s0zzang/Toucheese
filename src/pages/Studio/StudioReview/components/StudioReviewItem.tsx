/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import variables from '@styles/Variables';

/** 각 리뷰의 대한 아이템 = 콘텐츠 */
const StudioReviewItem = () => {
  return <StudioReviewItemContainerStyle>StudioReviewItem</StudioReviewItemContainerStyle>;
};

export default StudioReviewItem;

const StudioReviewItemContainerStyle = styled.div`
  width: 100%;
  height: 31rem;
  margin-top: 1rem;
  background-color: ${variables.colors.gray100};
`;
