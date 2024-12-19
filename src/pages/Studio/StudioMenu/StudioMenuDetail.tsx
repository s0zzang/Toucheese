/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import Header from '@components/Header/Header';
import { useParams } from 'react-router-dom';
import { TypoBodyMdM, TypoTitleSmS } from '@styles/Common';
import StudioMenuDetailInfo from './StudioMenuDetailInfo';
import { useEffect, useState } from 'react';
import StudioMenuDetailReview from './StudioMenuDetailReview';
import { IMenuListRes } from 'types/types';
import ImageSwiper from '@components/ImageSwiper/ImageSwiper';

const StudioMenuDetail = () => {
  const { _menuId } = useParams();
  const [tabMenuState, setTabMenuState] = useState('info');
  const [data, setData] = useState<IMenuListRes>();

  const fetchMeunDetil = async () => {
    const res = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/menu/${_menuId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error('Failed to fetch data');
    }

    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchMeunDetil();
  }, []);

  return (
    <>
      <Header title="프로필 A반신 촬영" />
      {/* {data && <ImageSwiper images={data.menuImages} slidesPerView={1} spaceBetween={0} />} */}
      <div css={MenuDescStyle}>
        <h2>{data?.name}</h2>
        <p>{data?.description}</p>
      </div>

      <ul css={TabMenuStyle}>
        <li onClick={() => setTabMenuState('info')} className={`${tabMenuState === 'info' && 'active'}`}>
          정보
        </li>
        <li onClick={() => setTabMenuState('review')} className={`${tabMenuState === 'review' && 'active'}`}>
          리뷰 {data?.reviewCount ? data?.reviewCount : '0'}
        </li>
      </ul>
      {tabMenuState === 'info' && <StudioMenuDetailInfo infoItem={data} />}
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

const ImgaeAddStyle = css`
  box-shadow: inset 0 0 10px blue;
`;
