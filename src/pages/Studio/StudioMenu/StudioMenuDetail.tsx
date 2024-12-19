/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import variables from '@styles/Variables';
import Header from '@components/Header/Header';
import { useParams } from 'react-router-dom';
import { TypoBodyMdM, TypoCapSmR, TypoTitleSmS } from '@styles/Common';
import StudioMenuDetailInfo from './StudioMenuDetailInfo';
import { useEffect, useState } from 'react';
import StudioMenuDetailReview from './StudioMenuDetailReview';
import { IMenuListRes } from 'types/types';
import ImageSwiper from '@components/ImageSwiper/ImageSwiper';
import Button from '@components/Button/Button';

const StudioMenuDetail = () => {
  const { _menuId } = useParams();
  const [tabMenuState, setTabMenuState] = useState('info');
  const [data, setData] = useState<IMenuListRes>();
  const [scrollY, setScrollY] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(data ? data.price : 0);

  const fetchMenuDetail = async () => {
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
    return data;
  };

  useEffect(() => {
    const fetchAndSetData = async () => {
      const result = await fetchMenuDetail();
      setData(result);
      setTotalPrice(result.price);
    };

    fetchAndSetData();
  }, []);

  const handleScroll = () => {
    if (window.scrollY >= 250) {
      setScrollY(true);
    } else {
      setScrollY(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Header title={`${scrollY ? data?.name : ''}`} customStyle={HeaderCustomStyle(scrollY)} />
      {data && <ImageSwiper images={data.menuImages} slidesPerView={1} spaceBetween={0} />}
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
      {tabMenuState === 'info' && <StudioMenuDetailInfo infoItem={data} setTotalPrice={setTotalPrice} />}
      {tabMenuState === 'review' && <StudioMenuDetailReview />}
      <div css={FixedBtnBoxStyle}>
        <div className="totalPrice">
          <span>총 결제금액</span>
          <p>{totalPrice?.toLocaleString('ko-KR')}원</p>
        </div>

        <Button text="예약하기" variant="black" type="submit" />
      </div>
    </>
  );
};

export default StudioMenuDetail;

const HeaderCustomStyle = (scrollY: boolean): SerializedStyles => {
  return css`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 50;
    padding: 1.6rem 1rem;
    ${scrollY && 'background-color: #fff; box-shadow: 0 0.4rem .5rem rgba(0, 0, 0, 0.1);'};
    transition: all 0.2s;
  `;
};

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

const FixedBtnBoxStyle = css`
  display: flex;
  gap: 2rem;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${variables.colors.white};
  padding: 1.6rem;
  border-top: 0.1rem solid ${variables.colors.gray300};

  .totalPrice {
    display: flex;
    flex-direction: column;
    min-width: 10rem;

    & span {
      ${TypoCapSmR}
      color:  ${variables.colors.gray600};
    }

    & p {
      ${TypoTitleSmS}
    }
  }
`;
