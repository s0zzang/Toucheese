/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import Header from '@components/Header/Header';
import { css } from '@emotion/react';
import useReservationStore from '@store/useReservationStore';
import {
  changeformatDateForUi,
  lessThan10Add0,
  useSelectDateStore,
} from '@store/useSelectDateStore';
import { useUserStore } from '@store/useUserStore';
import { TypoBodySmM, TypoBodySmR, TypoTitleXsSB } from '@styles/Common';
import variables from '@styles/Variables';

const ReservationDetail = () => {
  const { totalPrice, options, menuName, basicPrice } = useReservationStore();
  const { username, phone } = useUserStore();

  // 취소 가능 날짜 계산
  const { date } = useSelectDateStore();

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
      const formattedDate = changeformatDateForUi({ date: sevenDaysBefore, time: new Set() });
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

  return (
    <>
      <Header title="예약상세" />
      <div css={containerStyle}>
        <section css={sectionStyle}>
          <h2 css={[TypoTitleXsSB, titleStyle]}>예약정보</h2>
          <div>
            <div>
              <div css={itemStyle}>
                <span>이용 상태</span>
                <span>사진관에서 예약 확인쭝</span>
              </div>
              <div css={itemStyle}>
                <span>예약 메뉴</span>
                <span>{menuName}</span>
              </div>
              <div>
                <div css={itemStyle}>
                  <span>추가 옵션</span>
                  <div css={optionsNameStyle}>
                    {options.map((option) => (
                      <span key={option.option_id}>{option.optionName}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section css={sectionStyle}>
          <h2 css={[TypoTitleXsSB, titleStyle]}>예약자정보</h2>
          <div>
            <div>
              <div css={itemStyle}>
                <span>이름</span>
                <span>{username}</span>
              </div>
              <div css={itemStyle}>
                <span>전화 번호</span>
                <span>{phone}</span>
              </div>
            </div>
          </div>
        </section>
        <section css={sectionStyle}>
          <h2 css={[TypoTitleXsSB, titleStyle]}>요청사항</h2>
          <div css={requestsStyle}>ㅇㅇ</div>
        </section>
        <section css={sectionStyle}>
          <h2 css={[TypoTitleXsSB, titleStyle]}>결제정보</h2>
          <div>
            <div css={itemStyle}>
              <span>총 결제금액</span>
              <span>{totalPrice.toLocaleString()}원</span>
            </div>
            <div css={itemStyle}>
              <span>기본 가격</span>
              <span>{menuName}</span>
              <span>{basicPrice?.toLocaleString()}원</span>
            </div>
            <div css={itemStyle}>
              <span>추가 옵션</span>
              <span>
                {options.map((option, index) => (
                  <span key={option.option_id}>
                    {option.optionName}
                    {index < options.length - 1 && <br />}
                  </span>
                ))}
              </span>
              <span>
                {options.map((option, index) => (
                  <span key={option.option_id}>
                    {option.optionPrice.toLocaleString()}원{index < options.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </div>
            <div css={itemStyle}>
              <span>결제 수단</span>
              <span>카페</span>
            </div>
          </div>
        </section>
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
        <Button
          type="button"
          text="취소하기"
          size="large"
          variant="deepGray"
          disabled={isDisabled}
          active={false}
        />
      </div>
    </>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const sectionStyle = css`
  margin-bottom: 0.8rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const titleStyle = css`
  border-bottom: 1px solid ${variables.colors.gray300};
  padding-bottom: 0.8rem;
  margin-bottom: 0.8rem;
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
export default ReservationDetail;
