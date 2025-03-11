/** @jsxImportSource @emotion/react */

import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import { TypoTitleXsM } from '@styles/Common';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  const email = watch('email');
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  useEffect(() => {
    // 모든 조건이 만족하면 활성화
    const passwordValid =
      // O(1) 연산 검증 추가
      (password ?? '').length >= 8 &&
      /^[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/.test(password) &&
      !password.includes(email);
    const isFormValid = passwordValid && password === passwordConfirm;

    setIsActive(isFormValid);
    setIsDisabled(!isFormValid);
  }, [email, password, passwordConfirm]);

  const onSubmit = (data: any) => {
    console.log('onsubmit :', data);
  };

  const handleVerifyComplete = async () => {
    // PATCH api end point 연결
    try {
      const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/auth/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(password),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }
      console.log('모달이 열려야함!');
      navigate('/');
    } catch (error) {
      console.error('비밀번호 변경 중 오류 발생:', error);
    }
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

      <div css={headerStyle}>
        <BackButton />
        <h1>비밀번호 변경</h1>
      </div>

      <form noValidate css={formStyle} onSubmit={handleSubmit(onSubmit)}>
        <div css={containerStyle}>
          {/* 비밀번호 */}
          <Input
            labelName="새 비밀번호"
            type="password"
            placeholder="8자 이상의 비밀번호"
            register={register('password', {
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
              validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다',
            })}
            error={errors.passwordConfirm?.message?.toString()}
          />
        </div>

        <div css={buttonStyle}>
          <Button
            onClick={handleVerifyComplete}
            type="submit"
            text="가입하기"
            size="large"
            variant="gray"
            width="max"
            active={isActive}
            disabled={isDisabled}
          />
        </div>
      </form>
    </>
  );
};

export default ChangePassword;

const headerStyle = css`
  display: flex;
  margin-bottom: 2rem;

  h1 {
    ${TypoTitleXsM}
    margin: auto;
  }
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 1.2rem;
`;

const buttonStyle = css`
  position: fixed;
  left: 0;
  bottom: 3rem;
  width: calc(100% - 3.2rem);
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
`;
