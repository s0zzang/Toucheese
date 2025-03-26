/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import ReservationNavigator from '@components/Navigator/ReservationNavigator';
import NoResult from '@components/NoResult/NoResult';
import ReservationCard from '@components/ReservationCard/ReservationCard';
import styled from '@emotion/styled';
import { useGetReservationList } from '@hooks/useGetReservationList';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodyMdM } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';
import { IResvItem } from 'types/types';

export interface ResStatus {
  statusKor: '이용 예정' | '이용 완료' | '예약 취소';
  statusEng: 'DEFAULT' | 'COMPLETED' | 'CANCELED';
}

const ReservationList = () => {
  const [resStatus, setResStatus] = useState<ResStatus>({
    statusKor: '이용 예정',
    statusEng: 'DEFAULT',
  });
  const [items, setItems] = useState<IResvItem[]>([]);

  // resStatus 변경 시 api 호출
  const { data } = useGetReservationList(resStatus.statusEng);

  // resStatus 변경 시 아이템 초기화
  useEffect(() => {
    setItems([]);
  }, [resStatus.statusEng]);

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  // 예약 내역이 없을 시 메시지 생성
  let emptyMessage;
  switch (resStatus.statusKor) {
    case '이용 예정':
      emptyMessage = (
        <>
          예약한 사진관이 없습니다.
          <br />
          사진관을 예약하고 인생 사진을
          <br />
          찍어보세요!
        </>
      );
      break;
    case '이용 완료':
      emptyMessage = <>방문하신 사진관이 없습니다.</>;
      break;
    case '예약 취소':
      emptyMessage = <>예약 취소하신 사진관이 없습니다.</>;
      break;
  }

  return (
    <>
      <HeaderContainerStyle>
        <Header title="예약내역" backTo="/user/mypage" />
        <ReservationNavigator status={resStatus} setStatus={setResStatus} />
      </HeaderContainerStyle>

      <SectionStyle>
        {items.length ? (
          <ContentStyle>
            <p css={TypoBodyMdM}>총 {items.length}건</p>
            {items.map((item) => (
              <ReservationCard key={item.reservationId} data={item} />
            ))}
          </ContentStyle>
        ) : (
          <NoResult message={emptyMessage} bg="gray100" />
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
`;

const SectionStyle = styled.section`
  margin: 10rem calc(-1 * ${variables.layoutPadding}) calc(-1 * (4rem + ${variables.headerHeight}));
  background-color: ${variables.colors.gray100};
  padding: 0 ${variables.layoutPadding} calc(4rem + ${variables.headerHeight});
  height: calc(100vh - 10rem);
  overflow-y: auto;

  ${mqMin(breakPoints.pc)} {
    margin: unset;
    padding: unset;
    height: calc(100vh - 8rem);
  }
`;

const ContentStyle = styled.div`
  padding-top: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export default ReservationList;
