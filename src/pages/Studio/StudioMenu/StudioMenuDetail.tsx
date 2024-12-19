/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import Header from '@components/Header/Header';
import { useParams } from 'react-router-dom';
import { TypoBodyMdM, TypoTitleSmS } from '@styles/Common';
import StudioMenuDetailInfo from './StudioMenuDetailInfo';
import { useState } from 'react';
import StudioMenuDetailReview from './StudioMenuDetailReview';

const StudioMenuDetail = () => {
  const { _menuId } = useParams();
  const [tabMenuState, setTabMenuState] = useState('info');

  return (
    <>
      <Header title="프로필 A반신 촬영" />
      <div css={MenuDescStyle}>
        <h2>사진 메뉴 이름</h2>
        <p>사진메뉴설명입니다유유유유유유유</p>
      </div>

      <ul css={TabMenuStyle}>
        <li onClick={() => setTabMenuState('info')} className={`${tabMenuState === 'info' && 'active'}`}>
          정보
        </li>
        <li onClick={() => setTabMenuState('review')} className={`${tabMenuState === 'review' && 'active'}`}>
          리뷰 00
        </li>
      </ul>
      {tabMenuState === 'info' && <StudioMenuDetailInfo />}
      {tabMenuState === 'review' && <StudioMenuDetailReview />}
    </>
  );
};

export default StudioMenuDetail;

const MenuDescStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.8rem 0;

  & h2 {
    ${TypoTitleSmS}
  }

  & p {
    ${TypoBodyMdM};
    color: ${variables.colors.gray800};
  }
`;

const TabMenuStyle = css`
  color: ${variables.colors.gray800};
  display: flex;
  width: 100%;
  text-align: center;

  & li {
    cursor: pointer;
    ${TypoBodyMdM};
    position: relative;
    padding: 1rem 0;
    text-align: center;
    flex-grow: 1;
    transition: all 0.3s;

    &::before {
      content: '';
      position: absolute;
      background-color: ${variables.colors.gray300};
      height: 0.2rem;
      left: 0;
      right: 0;
      bottom: 0;
    }

    &.active {
      color: ${variables.colors.black};
    }

    &.active::before {
      background-color: ${variables.colors.black};
    }
  }
`;
