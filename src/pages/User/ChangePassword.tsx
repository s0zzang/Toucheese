/** @jsxImportSource @emotion/react */

import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { PCLayout, TypoTitleMdSb, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();

  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const openToast = useToast();

  const email = watch('email');
  const newPassword = watch('newPassword');
  const passwordConfirm = watch('passwordConfirm');
  const location = useLocation();
  const modal = useModal(5); // 모달 ID
  useEffect(() => {
    if (location.state?.showSuccessModal) {
      modal.open();
    }
  }, [location.state]);

  useEffect(() => {
    // 모든 조건이 만족하면 활성화
    const passwordValid =
      // O(1) 연산 검증 추가
      (newPassword ?? '').length >= 8 &&
      /^[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/.test(newPassword) &&
      !newPassword.includes(email);
    const isFormValid = passwordValid && newPassword === passwordConfirm;

    setIsActive(isFormValid);
    setIsDisabled(!isFormValid);
  }, [email, newPassword, passwordConfirm]);

  const loadSessionStorageData = (key: string) => {
    /** key에 해당하는 데이터 호출 */
    const localData = localStorage.getItem(key);
    if (!localData) {
      return null;
    }

    try {
      const parsedData = JSON.parse(localData);
      return parsedData;
    } catch (error) {
      console.error('JSON 파싱 오류', error);
      openToast('데이터를 불러오는 데 문제가 발생했습니다.');
      return null;
    }
  };
  const userData = loadSessionStorageData('userState');
  const accessToken = userData.state.accessToken;

  const handleVerifyComplete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/user/mypage/changepw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }
      navigate('/user/profile', {
        state: { showSuccessModal: true },
      });
    } catch (error) {
      console.error('비밀번호 변경 중 오류 발생:', error);
      openToast('비밀번호 변경 중 오류가 발생했습니다');
    }
  };

  const onsubmit = () => {
    handleVerifyComplete();
  };

  /** local storage에 저장된 계정 정보 불러오기 */
  const loadLocalStorageData = (key: string) => {
    /** key에 해당하는 데이터 호출 */
    const localData = localStorage.getItem(key);
    if (!localData) {
      return null;
    }

    try {
      const parsedData = JSON.parse(localData);
      return parsedData;
    } catch (error) {
      console.error('JSON 파싱 오류', error);
      openToast('서버 응답을 처리하는 데 문제가 발생했습니다.');
      return null;
    }
  };
  const emailData = loadLocalStorageData('userState');

  return (
    <>
      <Helmet>
        <title>{`개인정보 변경 - 비밀번호 변경`}</title>
        <meta property="og:title" content="사용자 계정 정보 변경" />
        <meta property="og:url" content={`${window.location.href}`} />
        <meta property="og:description" content="사용자 정보 변경" />
      </Helmet>
      <div css={changePasswordWrapper}>
        <div css={MOheaderStyle}>
          <BackButton />
          <h1>비밀번호 변경</h1>
        </div>
        <div css={PCheaderStyle}>
          <h1>비밀번호 변경</h1>
        </div>
        <form noValidate onSubmit={handleSubmit(onsubmit)} css={formStyle}>
          <div css={containerStyle}>
            {/* 비밀번호 */}
            <Input
              labelName="새 비밀번호"
              type="password"
              placeholder="8자 이상의 비밀번호"
              register={register('newPassword', {
                required: '비밀번호를 입력해주세요',
                validate: (value) => {
                  const email = `${emailData.state.email}` || '';
                  const usernameFromEmail = email.match(/^[^@]+/)?.[0] || '';

                  if (value.includes(email) || value.includes(usernameFromEmail)) {
                    return '비밀번호에 이메일 주소를 포함할 수 없습니다';
                  }

                  const username = watch('name') || '';
                  if (username && value.includes(username)) {
                    return '비밀번호에 이름을 포함할 수 없습니다';
                  }

                  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/.test(value)) {
                    return '8~20자 영문/숫자 조합으로 입력해주세요.';
                  }

                  return true;
                },
              })}
              error={errors.password?.message?.toString()}
            />

            {/* 비밀번호 확인 */}
            <Input
              labelName="새 비밀번호 확인"
              type="password"
              placeholder="비밀번호를 재입력하세요"
              register={register('passwordConfirm', {
                required: '비밀번호를 재입력하세요',
                validate: (value) =>
                  value === watch('newPassword') || '비밀번호가 일치하지 않습니다',
              })}
              error={errors.passwordConfirm?.message?.toString()}
            />
          </div>

          <div css={buttonStyle}>
            <Button
              onClick={handleVerifyComplete}
              type="submit"
              text="변경하기"
              size="large"
              variant="gray"
              width="max"
              active={isActive}
              disabled={isDisabled}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;

const changePasswordWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: ${variables.headerHeight};

  ${mqMin(breakPoints.pc)} {
    ${PCLayout}
    min-width:  60.8rem;
    max-width: 60.8rem;
    padding: 4rem 1.6rem 0;
    margin: 0 auto 0 31rem;
  }
`;

const MOheaderStyle = css`
  position: relative;
  display: flex;
  height: 5rem;
  align-items: center;

  h1 {
    ${TypoTitleXsM}
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  ${mqMin(breakPoints.pc)} {
    display: none;
  }
`;
const PCheaderStyle = css`
  display: none;

  h1 {
    ${TypoTitleMdSb}
    margin-bottom: 4.2rem;
  }

  ${mqMin(breakPoints.pc)} {
    margin-bottom: 3.2rem;
    display: contents;
  }
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const buttonStyle = css`
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 0 ${variables.layoutPadding};

  ${mqMin(breakPoints.pc)} {
    left: calc(max((100vw - 1280px) / 2, 0px) + 32rem);
    transform: none;
    width: auto;

    & > button {
      min-width: 60rem;
      max-width: 60rem;
      width: 100%;
    }
  }
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
`;
