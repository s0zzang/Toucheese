/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import ReservationCard from '@components/ReservationCard/ReservationCard';
import { css } from '@emotion/react';
import { IResItem } from '@pages/Reservation/ReservationList';
import { defaultUserState, useUserStore } from '@store/useUserStore';
import { TypoBodyMdR, TypoTitleMdSb, TypoTitleXsR } from '@styles/Common';
import variables from '@styles/Variables';
import { getLocalStorageItem } from '@utils/getLocalStorageItem';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IUser } from 'types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const MyPage = () => {
  const { username, email } = getLocalStorageItem<IUser>('userState', defaultUserState);
  const { pathname } = useLocation();

  const data: IResItem[] = [
    {
      id: 2,
      status: 'confirmed',
      studio: '모노 멘션',
      menu: '상반신 촬영',
      menuImage: 'https://i.imgur.com/7C4GSF4.webp',
      date: '2025-01-25',
      time: '13:00',
    },
    {
      id: 4,
      status: 'confirmed',
      studio: '모노 멘션',
      menu: '상반신 촬영',
      menuImage: 'https://i.imgur.com/7C4GSF4.webp',
      date: '2025-01-25',
      time: '13:00',
    },
    {
      id: 3,
      status: 'confirmed',
      studio: '모노 멘션',
      menu: '상반신 촬영',
      menuImage: 'https://i.imgur.com/7C4GSF4.webp',
      date: '2025-01-12',
      time: '13:00',
    },
  ];

  // 임시 로그아웃
  const logout = useUserStore((state) => state.resetUser);
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Header title="마이페이지" />
      <div css={MyInfoStyle}>
        <Link to="/user/profile">{username}님 환영해요!</Link>
        <p>{email}</p>
      </div>
      <Swiper
        css={ReservationCardSwiperStyle}
        modules={[Pagination]}
        centeredSlides={true}
        spaceBetween={10}
        slidesPerView={1.1}
        pagination={{
          clickable: true,
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <ReservationCard isMyPage={pathname.includes('mypage')} data={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <ul css={MyPageMenuStyle}>
        <li className="history">
          <Link to="/reservation/list">예약내역</Link>
        </li>
        <li className="myreview">
          <Link to="/user/myReviews">내 리뷰</Link>
        </li>
        <li className="bookmarkstudio">
          <Link to="/user/bookmarks">찜한 사진관</Link>
        </li>
      </ul>

      <button type="button" onClick={handleClick}>
        로그아웃
      </button>
    </>
  );
};

export default MyPage;

const MyInfoStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.6rem 0;
  align-items: flex-start;

  & a {
    ${TypoTitleMdSb}
    display: flex;
    gap: 0.4rem;
    align-items: center;

    &::after {
      content: '';
      width: 2.4rem;
      height: 2.4rem;
      background-image: url('/img/icon-arrow-right-black.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 1rem;
    }
  }

  & p {
    ${TypoBodyMdR}
    color:${variables.colors.gray800}
  }
`;

const MyPageMenuStyle = css`
  &::before {
    content: '';
    display: block;
    background-color: ${variables.colors.gray300};
    height: 1rem;
    width: calc(100% + (1.6rem * 2));
    margin-left: -1.6rem;
    margin-top: 1.6rem;
  }

  & li {
    & a {
      padding: 1.6rem 0;
      border-bottom: 0.1rem solid ${variables.colors.gray300};
      ${TypoTitleXsR}
      display: flex;
      gap: 1.6rem;
      align-items: center;

      &::after {
        content: '';
        width: 2.4rem;
        height: 2.4rem;
        background-image: url('/img/icon-arrow-16.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 1rem;
        margin-left: 1.1;
      }

      &::before {
        content: '';
        width: 2rem;
        height: 2rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 2rem;
      }
    }
  }

  .history > a::before {
    background-image: url('/img/icon-calendar-black.svg');
  }
  .myreview > a::before {
    background-image: url('/img/icon-myreview.svg');
  }
  .bookmarkstudio > a::before {
    background-image: url('/img/icon-studio-black.svg');
  }
  .bookmarkstudio > a {
    border-bottom: none;
  }
`;

const ReservationCardSwiperStyle = css`
  width: calc(100% + (${variables.layoutPadding} * 2));
  margin-left: calc(-1 * ${variables.layoutPadding});
  padding-bottom: 1.6rem;

  .swiper-pagination {
    position: absolute;
    z-index: 10;
    width: 8rem;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    background-color: ${variables.colors.gray400};
  }

  .swiper-pagination-bullet {
    width: 100%;
    height: 0.2rem;
    border-radius: 0;
    margin: 0 !important;
    cursor: pointer;
  }

  .swiper-pagination-bullet-active {
    background-color: ${variables.colors.primary600};
  }
`;
