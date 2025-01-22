/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import ReservationNavigator from '@components/Navigator/ReservationNavigator';
import ReservationCard from '@components/ReservationCard/ReservationCard';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { TypoBodyMdM, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';

export type ResStatus = '이용 예정' | '이용 완료' | '예약 취소';
const STATUS: ResStatus[] = ['이용 예정', '이용 완료', '예약 취소'];

export interface IResItem {
  id: number;
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';
  studio: string;
  menu: string;
  menuImage: string;
  date: string;
  time: string;
  review?: {
    rating: number;
    content: string;
  };
}

// 임시 데이터
const reserved: IResItem[] = [
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
    id: 1,
    status: 'pending',
    studio: '모노 멘션',
    menu: '상반신 촬영',
    menuImage: 'https://i.imgur.com/7C4GSF4.webp',
    date: '2025-01-18',
    time: '13:00',
  },
];

const completed: IResItem[] = [
  {
    id: 4,
    status: 'completed',
    studio: '모노 멘션',
    menu: '상반신 촬영',
    menuImage: 'https://i.imgur.com/7C4GSF4.webp',
    date: '2025-01-25',
    time: '13:00',
    review: {
      rating: 4,
      content: '좋았어요',
    },
  },
  {
    id: 3,
    status: 'completed',
    studio: '모노 멘션',
    menu: '상반신 촬영',
    menuImage: 'https://i.imgur.com/7C4GSF4.webp',
    date: '2025-01-12',
    time: '13:00',
  },
];

const canceled: IResItem[] = [];

const ReservationList = () => {
  const [resStatus, setResStatus] = useState<ResStatus>('이용 예정');
  const [data, setData] = useState<IResItem[]>([]);

  // 로컬 스토리지에서 토큰 꺼내기
  // const { accessToken } = getLocalStorageItem<IUser>('userState', defaultUserState);

  // resStatus 변경 시 api 호출
  useEffect(() => {
    // if (accessToken) {
    //   const result = useGetReservationList(resStatus, accessToken);
    // }

    // 임시로 데이터 set
    if (resStatus === '이용 예정') setData(reserved);
    else if (resStatus === '이용 완료') setData(completed);
    else setData(canceled);
  }, [resStatus]);

  // 예약 내역이 없을 시 메시지 생성
  let emptyMessage;
  switch (resStatus) {
    case '이용 예정':
      emptyMessage = (
        <p css={TypoTitleXsM}>
          예약한 사진관이 없습니다.
          <br />
          사진관을 예약하고 인생 사진을
          <br />
          찍어보세요!
        </p>
      );
      break;
    case '이용 완료':
      emptyMessage = <p css={TypoTitleXsM}>방문하신 사진관이 없습니다.</p>;
      break;
    case '예약 취소':
      emptyMessage = <p css={TypoTitleXsM}>예약 취소하신 사진관이 없습니다.</p>;
      break;
  }

  return (
    <>
      <HeaderContainerStyle>
        <Header title="예약내역" backTo="/user/mypage" customStyle={headerStyle} />
        <ReservationNavigator list={STATUS} status={resStatus} setStatus={setResStatus} />
      </HeaderContainerStyle>

      <SectionStyle className={data.length ? '' : 'empty'}>
        {data.length ? (
          <ContentStyle>
            <p css={TypoBodyMdM}>총 {data.length}건</p>
            {data.map((item) => (
              <ReservationCard key={item.id} data={item} />
            ))}
          </ContentStyle>
        ) : (
          emptyMessage
        )}
      </SectionStyle>
    </>
  );
};

const HeaderContainerStyle = styled.div`
  background-color: ${variables.colors.white};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 4rem;
`;

const SectionStyle = styled.section`
  margin: 0 calc(-1 * ${variables.layoutPadding}) -8.8rem;
  background-color: ${variables.colors.gray100};
  padding: 11.6rem ${variables.layoutPadding} calc(4rem + ${variables.headerHeight});
  height: calc(100vh - 4rem);
  overflow-y: auto;

  &.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${variables.colors.gray700};

    & > p {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.733rem;
      text-align: center;

      &::before {
        content: '';
        width: 4.2rem;
        height: 4.2rem;
        background-image: url('/img/icon-noreservation.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
  }
`;

const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const headerStyle = css`
  display: flex;
  align-items: center;
  padding: 1.6rem;
`;

export default ReservationList;
