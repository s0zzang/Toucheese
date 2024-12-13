/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { DividerStyle } from '@styles/Common';
import variables from '@styles/Variables';

/** 이미지만 상세보기 (자식) 컴포넌트 */
const StudioReviewImageList = () => {
  return (
    <PhotoContainerStyle>
      <div>
        <img src="/img/sample-1.png" alt="증명1" />
      </div>
      <div>
        <img src="/img/sample-2.png" alt="증명2" />
      </div>
      <div>
        <img src="/img/sample-2.png" alt="증명2" />
      </div>
      <div>
        <img src="/img/sample-2.png" alt="증명2" />
      </div>
    </PhotoContainerStyle>
  );
};

export default StudioReviewImageList;

const PhotoContainerStyle = styled.div`
  position: relative;
  margin-top: 1.8rem;
  width: 100%;
  display: flex;
  gap: 0.2rem;

  & > div {
    width: 25%;
  }

  & > div > img {
    width: 100%;
    object-fit: cover;
    margin-bottom: 3rem;
  }
  ${DividerStyle}
`;
