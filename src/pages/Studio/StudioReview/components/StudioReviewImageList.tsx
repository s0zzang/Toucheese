/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

/** 이미지만 상세보기 (자식) 컴포넌트 */
const StudioReviewImageList = () => {
  return <PhotoContainerStyle>이미지 리스트</PhotoContainerStyle>;
};

export default StudioReviewImageList;

const PhotoContainerStyle = styled.div`
  margin-top: 1.8rem;
  width: 100%;
  height: 10rem;
  box-shadow: inset 0px 0px 10px gray;
`;
