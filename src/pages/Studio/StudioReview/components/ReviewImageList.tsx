/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

/** 이미지만 받아서 보여주는 (자식) 컴포넌트 */
const ReviewImageList = () => {
  return <PhotoContainerStyle>이미지 리스트</PhotoContainerStyle>;
};

export default ReviewImageList;

const PhotoContainerStyle = styled.div`
  margin-top: 0.8rem;
  width: 100%;
  height: 8rem;
  box-shadow: inset 0px 0px 10px gray;
`;
