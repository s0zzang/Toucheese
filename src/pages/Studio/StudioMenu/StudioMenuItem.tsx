/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { useNavigate } from 'react-router-dom';

const StudioMenuItem = ({ StudioId }: { StudioId: string | undefined }) => {
  const navigate = useNavigate();
  return (
    <>
      <section css={MeunItemWrapperStyle} onClick={() => navigate(`/studio/${StudioId}/menu/1`)}>
        <div css={MenuCoverStyle}>이미지</div>
        <div css={MenuDescStyle}>
          <div css={MenuHeadStyle}>
            <h4>메뉴 제목</h4>
            <p>메뉴에 대한 간단한 설명이 들어갑니다. 최대 2줄이 들어갑니다. 글자 초과화면 더보기 누르기...</p>
          </div>
          <div css={MenuPriceReviewStyle}>
            <p>000000원</p>
            <span>리뷰00</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudioMenuItem;

const MeunItemWrapperStyle = css`
  display: flex;
  gap: 1.4rem;
  padding: 1.4rem 0;
  box-sizing: border-box;
  border-bottom: 0.1rem solid ${variables.colors.gray300};
`;

const MenuCoverStyle = css`
  max-width: 9.4rem;
  width: 100%;
  aspect-ratio: 1 / 1.2;
  background: #ddd;
`;

const MenuDescStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const MenuHeadStyle = css`
  & h4 {
    font-size: ${variables.size.medium};
    font-weight: 500;
    display: flex;
    align-items: center;
    margin-bottom: 0.4rem;

    &::after {
      content: '';
      display: inline-block;
      width: 1.6rem;
      height: 1.6rem;
      background-image: url(/img/icon-chevronright.svg);
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  & p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    font-size: 1.2rem;
    font-weight: 300;
    color: ${variables.colors.gray800};
  }
`;

const MenuPriceReviewStyle = css`
  & p {
    font-size: 1.4rem;
    font-weight: 700;
  }

  & span {
    font-size: 1rem;
    color: ${variables.colors.gray700};
  }
`;
