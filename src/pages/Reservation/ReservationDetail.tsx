/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import Header from '@components/Header/Header';
import StatusChip from '@components/ReservationCard/StatusChip';
import { css } from '@emotion/react';
import {
  changeformatDateForUi,
  lessThan10Add0,
  useSelectDateStore,
} from '@store/useSelectDateStore';
import {
  DividerStyle,
  TypoBodyMdM,
  TypoBodySmM,
  TypoBodySmR,
  TypoTitleSmS,
  TypoTitleXsM,
  TypoTitleXsSB,
} from '@styles/Common';
import variables from '@styles/Variables';
import LocationModal from './components/LocationModal';
import useModal from '@hooks/useModal';
import CancelModal from './components/CancelModal';
import BottomSheet from '@components/BottomSheet/BottomSheet';
import { useGetStudioDetail } from '@hooks/useGetStudioDetail';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface IReservationData {
  studioId: string;
  studioName: string;
  startTime: string;
  additionalMenuIds: string[];
  additionalMenuNames: string[];
  additionalMenuPrices: string[];
  menuName: string;
  menuImage: string;
  note: string;
  status: 'WAITING' | 'RESERVED' | 'COMPLETED' | 'CANCELED';
  basicPrice: number;
  totalPrice: number;
  userName: string;
  userPhone: string;
}

const ReservationDetail = () => {
  const navigate = useNavigate();
  const { _id } = useParams<{ _id: string }>();
  const [reservationData, setReservationData] = useState<IReservationData | null>(null);
  const { data: studioDetail } = useGetStudioDetail(reservationData?.studioId || '');
  const locationModal = useModal(3);
  const cancelModal = useModal(4);

  // 취소 가능 날짜 계산
  const { date } = useSelectDateStore(); //임시

  const calculateSevenDaysBefore = (date: string): string => {
    const targetDate = new Date(date);
    targetDate.setDate(targetDate.getDate() - 8);
    return `${targetDate.getFullYear()}-${lessThan10Add0(targetDate.getMonth() + 1)}-${lessThan10Add0(targetDate.getDate())}`;
  };

  const getCancellationMessage = (date: string): string => {
    const sevenDaysBefore = calculateSevenDaysBefore(date);
    const isDeadlinePassed = isPastDeadline(sevenDaysBefore);

    if (isDeadlinePassed) {
      return '규정에 따라 예약취소가 불가합니다. 사진관에 문의해주세요.';
    } else {
      const formattedDate = changeformatDateForUi({ date: sevenDaysBefore, time: [] });
      return `${formattedDate} 23:59까지 예약취소가 가능합니다.`;
    }
  };

  const isPastDeadline = (date: string): boolean => {
    const deadlineDate = new Date(`${date}T23:59:59`);
    const now = new Date();
    return now > deadlineDate;
  };
  const sevenDaysBefore = calculateSevenDaysBefore(date);
  const isDisabled = isPastDeadline(sevenDaysBefore);

  useEffect(() => {
    if (!_id) return;

    fetch(`${import.meta.env.VITE_TOUCHEESE_API}/reservation/check?reservationId=${_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || '예약 정보 불러오기 실패');
        }
        return res.json();
      })
      .then((data) => {
        console.log('예약 상세 데이터:', data);
        setReservationData(data);
      })
      .catch((error) => {
        console.error('예약 상세 요청 에러:', error);
      });
  }, [_id]);

  if (!reservationData) {
    return null;
  }

  const {
    studioId,
    studioName,
    startTime,
    additionalMenuNames,
    additionalMenuPrices,
    menuName,
    menuImage,
    note,
    status,
    basicPrice,
    totalPrice,
    userName,
    userPhone,
  } = reservationData;

  return (
    <>
      <Header title="예약상세" />
      <div css={containerStyle}>
        <section css={DividerStyle}>
          <div css={studioInfoStyle}>
            <div css={studioInfoTextStyle}>
              <StatusChip state={status} />
              <h2 css={TypoTitleSmS}>{studioName}</h2>
              <p css={TypoBodyMdM}>2025.01.08 {startTime}</p>
            </div>
            <img src={menuImage} alt="포트폴리오 이미지" css={imgStyle} />
          </div>
          <div css={buttonContainerStyle}>
            <a css={buttonStyle} href={`tel:${studioDetail?.phone}`}>
              <img
                src="/img/icon-call-gray800.svg"
                alt="전화버튼아래화살표"
                css={buttonIconStyle}
              />
              <p css={TypoBodySmR}>전화</p>
            </a>
            <button
              css={buttonStyle}
              onClick={() => {
                locationModal.open();
              }}
            >
              <img src="/img/icon-location.svg" alt="위치버튼아래화살표" css={buttonIconStyle} />
              <p css={TypoBodySmR}>위치</p>
            </button>
            <LocationModal modalId={3} id="146" />
          </div>
        </section>

        <section css={sectionStyle}>
          <h2 css={[TypoTitleXsSB, titleStyle, addTitleStyle]}>예약정보</h2>
          <div>
            <div>
              <div css={itemStyle}>
                <span>이용 상태</span>
                <span>사진관에서 예약 확인중</span>
              </div>
              {status === 'CANCELED' && (
                <>
                  <div css={itemStyle}>
                    <span>취소 신청 일시</span>
                    <span>2025.01.08 어쩌구</span>
                  </div>
                  <div css={itemStyle}>
                    <span>취소 사유</span>
                    <span>일정변경</span>
                  </div>
                </>
              )}
              <div css={itemStyle}>
                <span>예약 메뉴</span>
                <span>{menuName}</span>
              </div>
              {additionalMenuNames && additionalMenuNames.length > 0 && (
                <div>
                  <div css={itemStyle}>
                    <span>추가 옵션</span>
                    <div css={optionsNameStyle}>
                      {additionalMenuNames.map((name, index) => (
                        <span key={index}>{name}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <section css={sectionStyle}>
          <h2 css={[TypoTitleXsSB, titleStyle]}>예약자정보</h2>
          <div>
            <div>
              <div css={itemStyle}>
                <span>이름</span>
                <span>{userName}</span>
              </div>
              <div css={itemStyle}>
                <span>전화 번호</span>
                <span>{userPhone}</span>
              </div>
            </div>
          </div>
        </section>
        {note && (
          <section css={sectionStyle}>
            <h2 css={[TypoTitleXsSB, titleStyle]}>요청사항</h2>
            <div css={requestsStyle}>{note}</div>
          </section>
        )}

        <section css={sectionStyle}>
          <h2 css={[TypoTitleXsSB, titleStyle]}>
            {' '}
            {status === 'CANCELED' ? '환불정보' : '결제정보'}
          </h2>
          <div>
            <div css={itemStyle}>
              <span>{status === 'CANCELED' ? '환불예상금액' : '총 결제금액'}</span>
              <span>{totalPrice.toLocaleString()}원</span>
            </div>
            <div css={itemStyle}>
              <span>기본 가격</span>
              <span>{menuName}</span>
              <span>{basicPrice?.toLocaleString()}원</span>
            </div>
            {additionalMenuNames && additionalMenuNames.length > 0 && (
              <div css={itemStyle}>
                <span>추가 옵션</span>
                <span>
                  {additionalMenuNames.map((name, index) => (
                    <span key={index}>
                      {name}
                      {index < additionalMenuNames.length - 1 && <br />}
                    </span>
                  ))}
                </span>
                <span>
                  {additionalMenuPrices.map((price, index) => (
                    <span key={index}>
                      {Number(price).toLocaleString()}원
                      {index < additionalMenuPrices.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </div>
            )}

            <div css={itemStyle}>
              <span>결제 수단</span>
              <span>네이버페이</span>
            </div>
          </div>
        </section>

        {status !== 'CANCELED' && (
          <section css={sectionStyle}>
            <h2 css={[TypoTitleXsSB, titleStyle]}>취소/환불 규정</h2>
            <div>
              <p css={[TypoBodySmM, isDisabled && redTextStyle]}>{getCancellationMessage(date)}</p>
              <div css={[refundInfoRowStyle, refundInfoFirstLineStyle]}>
                <span>이용 7일 전까지</span>
                <span>결제 금액에 대한 취소 수수료 없음</span>
              </div>
              <div css={refundInfoRowStyle}>
                <span>이용 7일 전 ~ 이용 당일</span>
                <span>취소 불가</span>
              </div>
            </div>
          </section>
        )}
        <div css={cancelStyle}>
          {status === 'CANCELED' ? (
            <Button
              type="button"
              text="다시 예약하기"
              size="large"
              variant="black"
              disabled={false}
              active={true}
              onClick={() => navigate(`/studio/${studioId}`)}
            />
          ) : (
            <Button
              type="button"
              text="취소하기"
              size="large"
              variant="deepGray"
              disabled={isDisabled}
              active={false}
              onClick={() => cancelModal.open()}
            />
          )}
        </div>
        <CancelModal modalId={4} />
        <BottomSheet />
      </div>
    </>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: ${variables.headerHeight};
`;

const studioInfoStyle = css`
  display: flex;
  padding: 1.4rem 0 1.4rem 0;
`;

const studioInfoTextStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: flex-start;
`;

const buttonContainerStyle = css`
  display: flex;
  gap: 1rem;
`;
const buttonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${variables.colors.gray400};
  border-radius: 0.6rem;
  box-sizing: border-box;
  width: 5.7rem;
  height: 3.2rem;
  gap: 0.2rem;
`;

const buttonIconStyle = css`
  width: 1.6rem;
  height: 1.6rem;
`;

const imgStyle = css`
  width: 6.7rem;
  height: 8rem;
  margin-left: auto;
  object-fit: cover;
`;

const sectionStyle = css`
  margin-bottom: 0.8rem;
`;

const titleStyle = css`
  border-bottom: 1px solid ${variables.colors.gray300};
  padding-bottom: 0.8rem;
  margin-bottom: 0.8rem;
`;

const addTitleStyle = css`
  margin-top: 1rem;
`;

const itemStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0;
  font-size: 1.2rem;

  & > span:first-of-type {
    ${TypoBodySmR};
    color: ${variables.colors.gray800};
  }

  & > span:nth-of-type(2) {
    flex: 1;
    margin-left: 1.6rem;
  }

  & > span:last-of-type {
    text-align: right;
  }
`;

const optionsNameStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
`;

const requestsStyle = css`
  ${TypoBodySmR};
  color: ${variables.colors.gray900};
  padding-bottom: 0.8rem;
`;

const refundInfoRowStyle = css`
  ${TypoBodySmR};
  display: flex;
  justify-content: space-between;

  span:first-of-type {
    color: ${variables.colors.gray800};
  }
`;

const refundInfoFirstLineStyle = css`
  margin: 0.8rem 0;
`;

const redTextStyle = css`
  color: ${variables.colors.red};
`;

const cancelStyle = css`
  background-color: ${variables.colors.white};
  padding: 1.8rem 1.6rem 3rem 1.6rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  z-index: 9;

  & > button {
    ${TypoTitleXsM}
  }
`;
export default ReservationDetail;
