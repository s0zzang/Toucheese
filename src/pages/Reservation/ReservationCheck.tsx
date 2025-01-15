/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import { css } from '@emotion/react';
import useModal from '@hooks/useModal';
import PolicyModal from '@pages/Reservation/components/PolicyModal';
import { TypoBodyMdR, TypoBodyMdSb, TypoBodySmR, TypoCapSmM, TypoTitleXsM, TypoTitleXsR, TypoTitleXsSB } from '@styles/Common';
import variables from '@styles/Variables';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Payment from './components/Payment';
import { useSelectTimeStore } from '@store/useSelectTime';
import { changeformatDateForUi, useSelectDateStore } from '@store/useSelectDate';
import useReservationStore from '@store/useReservationStore';

interface FormValues {
  visitorName: string;
  visitorContact: string;
  requests?: string;
  agree?: boolean;
}

const ReservationCheck = () => {
  const [paymentMethod, setPaymentMethod] = useState('kakaoPay');
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  const { time } = useSelectTimeStore();
  const { date } = useSelectDateStore();
  const { studioName, totalPrice, options, menuName, basicPrice, menuImage } = useReservationStore();
  const [isDifferentVisitor, setIsDifferentVisitor] = useState(false);

  const {
    register,
    getValues,
    setFocus,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormValues>({ mode: 'onChange' });

  const [visitorName, visitorContact] = watch(['visitorName', 'visitorContact']);

  const handleSubmitForm = async () => {
    const isValid = await trigger();

    if (!isValid) {
      if (errors.visitorName) {
        setFocus('visitorName');
        return;
      }

      if (errors.visitorContact) {
        setFocus('visitorContact');
        return;
      }

      if (!isAgreed) {
        setFocus('agree');
        return;
      }
    }

    if (isValid) {
      const formData = getValues();
      console.log('데이터', formData);
    }
  };

  const { open } = useModal(1);

  return (
    <>
      <Header title="결제하기" />

      {/* 예약정보 */}
      <section>
        <h2 css={[TypoTitleXsSB, titleAlignStyle]}>예약정보</h2>
        <div css={boxStyle}>
          <h4
            css={css`
              color: ${variables.colors.gray800};
              font-size: 1.2rem;
            `}
          >
            {studioName}
          </h4>
          <p css={TypoTitleXsM}>{changeformatDateForUi({ date, time })}</p>
          <hr css={hrStyle} />
          <div css={flexRow}>
            <div>
              <p css={TypoTitleXsM}>{menuName}</p>
              <div css={textWrapperStyle}>
                {options.map((option) => (
                  <span key={option.option_id}>{option.optionName}</span>
                ))}
              </div>
            </div>
            <img src={menuImage} alt="포트폴리오 이미지" css={imgStyle} />
          </div>
        </div>
      </section>

      {/* 예약자정보 */}
      <section>
        <h2 css={[TypoTitleXsSB, titleAlignStyle]}>예약자정보</h2>
        <p css={TypoTitleXsM}>박지똥</p>
        <p css={TypoTitleXsM}>010-1234-5678</p>
        <div css={checkboxWrapperStyle}>
          <input type="checkbox" id="visitorCheckbox" css={checkboxStyle} onChange={(e) => setIsDifferentVisitor(e.target.checked)} />
          <label htmlFor="visitorCheckbox" css={labelStyle}>
            <img src="/img/icon-check-gray.svg" alt="체크 아이콘" />
            실제 방문자가 달라요
          </label>
        </div>
      </section>

      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {/* 방문자가 다를 경우 */}
        {isDifferentVisitor && (
          <section>
            <h2 css={TypoBodyMdSb}>실제 방문하실 분의 정보를 입력하세요.</h2>
            <div css={visitorFormStyle}>
              <label css={TypoBodySmR} htmlFor="visitorName">
                방문자 이름
              </label>
              <div css={visitorInputStyle}>
                <input type="text" placeholder="방문자 이름을 입력하세요." id="visitorName" {...register('visitorName', { required: '방문자 이름을 입력해주세요.' })} />
                {visitorName && (
                  <button type="button" onClick={() => setValue('visitorName', '')}>
                    <img src="/img/icon-cancel.svg" alt="입력창 삭제 버튼" />
                  </button>
                )}
              </div>
              {errors.visitorName?.message && <p>{errors.visitorName.message}</p>}
              <label css={TypoBodySmR} htmlFor="visitorName">
                휴대폰 번호 (-제외)
              </label>
              <div css={visitorInputStyle}>
                <input
                  type="text"
                  placeholder="'-'구분없이 휴대폰 번호를 입력하세요."
                  {...register('visitorContact', {
                    required: '방문자 연락처를 입력해주세요.',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: '숫자만 입력해주세요.',
                    },
                  })}
                />
                {visitorContact && (
                  <button type="button" onClick={() => setValue('visitorContact', '')}>
                    <img src="/img/icon-cancel.svg" alt="입력창 삭제 버튼" />
                  </button>
                )}
              </div>

              {errors.visitorContact?.message && <p>{errors.visitorContact.message}</p>}
            </div>
          </section>
        )}
        <section>
          <h2 css={[TypoTitleXsSB, titleAlignStyle]}>요청사항</h2>
          <textarea
            css={textRequestsStyle}
            placeholder="방문 전 요청하실 내용을 적어주세요.&#10;원하는 스타일을 작가님에게 전달할 수 있습니다."
            {...register('requests')}
          />
        </section>
      </form>

      {/* 결제정보*/}
      <section>
        <h2 css={[TypoTitleXsSB, titleAlignStyle]}>결제정보</h2>
        <div css={[boxStyle, TypoBodySmR]}>
          <div css={PriceInforowStyle}>
            <span>기본 가격</span>
            <span>{menuName}</span>
            <span>{basicPrice?.toLocaleString()}원</span>
          </div>
          <div css={PriceInforowStyle}>
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

          <hr css={hrStyle} />
          <div css={[PriceInforowStyle, TypoTitleXsSB, totalPriceStyle]}>
            <span>총 결제금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
        </div>
      </section>

      {/* 결제수단 */}
      <section>
        <h2 css={[TypoTitleXsSB, titleAlignStyle]}>결제수단</h2>
        <div css={[TypoTitleXsR, radioGroupStyle]}>
          <label css={radioLabelStyle}>
            <input type="radio" name="paymentMethod" value="kakaoPay" onChange={(e) => setPaymentMethod(e.target.value)} defaultChecked />
            <img src="/img/icon-kakaoPay.svg" alt="카카오페이 로고" />
          </label>
          <label css={radioLabelStyle}>
            <input type="radio" name="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)} value="naverPay" />
            <img src="/img/icon-naverPay.svg" alt="네이버페이 로고" />
          </label>
          <label css={radioLabelStyle}>
            <input type="radio" name="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)} value="creditCard" />
            <span>일반신용카드</span>
          </label>
        </div>
      </section>

      {/* 개인정보 동의 */}
      <div css={termsContainerStyle}>
        <div css={termsCheckStyle}>
          <input type="checkbox" id="agree" onChange={handleCheckboxChange} />
          <label htmlFor="agree" css={termsCheckBoxStyle(isAgreed)}>
            <img src="/img/icon-checkbox-empty.svg" alt="빈 체크박스" />
            <img src="/img/icon-checkbox-done.svg" alt="체크된 체크박스" />
          </label>
          <span>결제 내용을 확인했으며, 아래 내용에 모두 동의합니다.</span>
        </div>
        {!isAgreed && <p>결제 진행을 위해 동의가 필요합니다.</p>}
        <div css={PrivacyPolicyTitleStyle}>
          <h3 css={TypoBodyMdSb}>개인정보 수집, 제공</h3>
          <button
            css={[TypoCapSmM, modalTitleColor]}
            onClick={() => {
              open();
            }}
          >
            전체보기
          </button>
          <PolicyModal />
        </div>

        <h3 css={TypoBodyMdSb}>취소/환불 규정</h3>
        <div css={[TypoBodySmR, refundPolicyTableStyle]}>
          <div css={refundInfoRowStyle}>
            <span>이용 7일 전까지</span>
            <span>결제 금액에 대한 취소 수수료 없음</span>
          </div>
          <hr css={hrStyle} />
          <div css={refundInfoRowStyle}>
            <span>이용 7일 전 ~ 이용 당일</span>
            <span>취소 불가</span>
          </div>
        </div>
      </div>
      <Payment onClick={handleSubmitForm} trigger={trigger} paymentMethod={paymentMethod} isAgreed={isAgreed} />
    </>
  );
};

export default ReservationCheck;

const titleAlignStyle = css`
  height: 4.2rem;
  line-height: 4.2rem;
`;

const boxStyle = css`
  height: 15.3rem;
  border: solid;
  border-radius: 0.6rem;
  border-color: ${variables.colors.gray400};
  padding: 1rem 1.4rem;
`;

const hrStyle = css`
  border: none;
  border-bottom: 0.1rem solid ${variables.colors.gray400};
`;

//예약정보
const flexRow = css`
  display: flex;
`;

const imgStyle = css`
  width: 6rem;
  height: 7.2rem;
  margin-left: auto;
`;

const textWrapperStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.5rem;
  span {
    position: relative;
    color: ${variables.colors.gray900};
    font-size: 1.2rem;
  }
  span:not(:last-child)::after {
    content: '|';
    margin-left: 0.6rem;
    color: #ccc;
  }
`;

//예약자정보
const checkboxWrapperStyle = css`
  position: relative;
  display: flex;
  margin: 1rem 0;
  input {
    display: none;
  }
  input:checked + label {
    border-color: ${variables.colors.primary600};
    background-color: ${variables.colors.primary50};
  }
`;

const checkboxStyle = css`
  opacity: 0;
  position: absolute;
`;

const labelStyle = css`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.6rem;
  font-size: 1.2rem;
  color: ${variables.colors.gray900};
  border: 1px solid ${variables.colors.gray500};
  border-radius: 0.6rem;
  cursor: pointer;
  gap: 0.1rem;
`;

const visitorFormStyle = css`
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    padding: 1.2rem 1rem;
    height: 5.6rem;
    font-size: 1.2rem;
    color: ${variables.colors.gray800};
    border-color: ${variables.colors.gray400};

    &:focus {
      outline: none;
      border-color: ${variables.colors.primary600};
    }

    &::placeholder {
      ${TypoBodyMdR};
      color: ${variables.colors.gray600};
    }
  }
  p {
    color: #f80100;
    font-size: 1.2rem;
  }
`;

const visitorInputStyle = css`
  position: relative;

  button {
    position: absolute;
    right: 1rem;
    bottom: 1.4rem;
  }
`;

const textRequestsStyle = css`
  color: ${variables.colors.gray600};
  border: 1px solid ${variables.colors.gray400};
  border-radius: 0.6rem;
  padding: 1rem 1.2rem;
  height: 9.6rem;

  &:focus {
    outline: none;
    border-color: ${variables.colors.primary600};
  }
  &::placeholder {
    ${TypoBodyMdR};
    color: ${variables.colors.gray600};
  }
`;

//결제정보
const PriceInforowStyle = css`
  display: flex;
  margin-bottom: 0.8rem;

  > span:first-of-type {
    color: ${variables.colors.gray800};
    margin-right: 0.8rem;
  }

  span:last-of-type {
    margin-left: auto;
    text-align: right;
  }
`;

const totalPriceStyle = css`
  margin-top: 1.5rem;
`;

//결제수단
const radioGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const radioLabelStyle = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  input {
    width: 2rem;
    height: 2rem;
    border: 2px solid ${variables.colors.gray500};
    border-radius: 50%;
    display: inline-block;
    position: relative;
    cursor: pointer;

    &:checked {
      border: 0.6rem solid ${variables.colors.primary600};
      background-color: white;
    }
  }
  img {
    width: 7rem;
  }
`;

//동의,약관,규정
const termsContainerStyle = css`
  padding-top: 3rem;
  h3 {
    height: 3.6rem;
    line-height: 3.6rem;
  }
  p {
    color: #f80100;
    font-size: 1.2rem;
  }
`;

const termsCheckStyle = css`
  display: flex;
  align-items: center;
  height: 4rem;

  input {
    display: none;
  }
`;

const termsCheckBoxStyle = (isAgreed: boolean) => css`
  cursor: pointer;
  margin-right: 0.8rem;

  img:first-of-type {
    display: ${isAgreed ? 'none' : 'block'};
  }

  img:nth-of-type(2) {
    display: ${isAgreed ? 'block' : 'none'};
  }
`;

const PrivacyPolicyTitleStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const modalTitleColor = css`
  color: ${variables.colors.gray600};
`;
const refundPolicyTableStyle = css`
  border: 1px solid ${variables.colors.gray400};
  border-radius: 0.6rem;
  padding: 1rem 1.4rem;
`;

const refundInfoRowStyle = css`
  display: flex;
  justify-content: space-between;

  span:first-of-type {
    color: ${variables.colors.gray800};
  }
`;
