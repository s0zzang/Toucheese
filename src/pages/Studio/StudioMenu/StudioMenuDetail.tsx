/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import variables from '@styles/Variables';
import Header from '@components/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { TypoBodyMdM, TypoTitleSmS } from '@styles/Common';
import StudioMenuDetailInfo from './StudioMenuDetailInfo';
import { useEffect, useState } from 'react';
import StudioMenuDetailReview from './StudioMenuDetailReview';
import { IMenuListRes } from 'types/types';
import ReservationFooter from '@components/ReservationFooter/ReservationFooter';
import useReservationStore from '@store/useReservationStore';
import ImageSwiper from '@components/Swiper/ImageSwiper';

const StudioMenuDetail = () => {
  const { _menuId, _id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IMenuListRes>();
  const [scrollY, setScrollY] = useState(false);
  const [tabMenuState, setTabMenuState] = useState('info');
  const setBasicPrice = useReservationStore((state) => state.setBasicPrice);
  const saveReservationDetails = useReservationStore((state) => state.saveReservationDetails);

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
      setBasicPrice(result.price);
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

  const handleReservartionNext = () => {
    const saveData = {
      studioId: data?.studioId,
      studioName: data?.studioName,
      menuName: data?.name,
    };

    saveReservationDetails(saveData);
    navigate(`/studio/${_id}/reservation`);
  };

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
      {data && tabMenuState === 'info' && <StudioMenuDetailInfo infoItem={data} />}
      {data && tabMenuState === 'review' && <StudioMenuDetailReview reviewItem={data?.reviews.content} rating={data?.avgScore} />}

      <ReservationFooter text="예약하기" type="button" onClick={handleReservartionNext} />
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
