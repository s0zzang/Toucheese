/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { TypoTitleXsM } from '@styles/Common';

/** 스튜디오 아이템 상세 리뷰 컴포넌트 */
const ReviewPage = () => {
  return (
    <>
      <ForHeader>헤더 위치</ForHeader>
      <ForNavBar>네브바 위치</ForNavBar>

      <ReviewPhotosWrapperStyle>
        <h1 css={TypoTitleXsM}>리뷰사진 (140)</h1>
        <PhotoContainerStyle></PhotoContainerStyle>
      </ReviewPhotosWrapperStyle>
    </>
  );
};

export default ReviewPage;

const ForHeader = styled.div`
  width: 100%;
  height: 5.6rem;
  box-shadow: inset 0px 0px 10px red;
`;
const ForNavBar = styled.div`
  width: 100%;
  height: 4rem;
  box-shadow: inset 0px 0px 10px blue;
`;
const ReviewPhotosWrapperStyle = styled.div`
  width: 100%;
  height: 8rem;
  margin-top: 2.2rem;
`;
const PhotoContainerStyle = styled.div`
  margin-top: 0.8rem;
  width: 100%;
  height: 8rem;
  background-color: gray;
`;
