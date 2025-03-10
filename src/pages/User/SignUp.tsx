/** @jsxImportSource @emotion/react */

import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import { TypoTitleMdSb } from '@styles/Common';
import { useForm } from 'react-hook-form';
import useSignupStore from '@store/useSignupStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const SignUp = () => {
  /** react-hook-form */
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  /** zustand 스토어에 데이터 저장 */
  const { setSignupData } = useSignupStore();

  const [emailError, setEmailError] = useState<string>('');
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const email = watch('email');
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  /** 이메일 중복 확인 */
  const CheckEmail = async (email: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_TOUCHEESE_API}/auth/register/check?email=${email}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`서버 오류가 발생 :${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const handleEmailCheck = async () => {
    const email = watch('email');
    if (!email) {
      setEmailError('이메일을 입력하세요.');
      return;
    }

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    try {
      const response = await CheckEmail(email);

      if (response.success === true) {
        setIsSuccess(true);
      } else if (response.success === false) {
        setEmailError('중복된 이메일입니다.');
      }
    } catch (error) {
      setEmailError('이메일 중복확인 에러');
    }
  };

  useEffect(() => {
    // 모든 조건이 만족하면 활성화
    const passwordValid =
      // O(1) 연산 검증 추가
      (password ?? '').length >= 8 &&
      /^[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/.test(password) &&
      !password.includes(email);
    const passwordsMatch = password === passwordConfirm;
    const isFormValid = isSuccess && passwordValid && passwordsMatch;

    setIsActive(isFormValid);
    setIsDisabled(!isFormValid);
  }, [email, password, passwordConfirm, emailError]);

  const onSubmit = (data: any) => {
    setSignupData(data);
  };

  /** local storage에 저장된 전화번호, 이름 불러오기 */
  const loadSessionStorageData = (key: string) => {
    /** key에 해당하는 데이터 호출 */
    const localData = sessionStorage.getItem(key);
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
  loadSessionStorageData('signup-storage');

  const handleVerifyComplete = async () => {
    const userData = loadSessionStorageData('signup-storage');

    // react-hook-form 입력된 데이터 가져오기
    const formData = {
      email,
      password,
      userName: userData?.state.username,
      phone: userData?.state.phone,
      registration: 'EMAIL',
    };

    // post
    try {
      const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }
      navigate('/user/signupSuccess');
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`회원가입 - 계정 생성`}</title>
        <meta property="og:title" content="사용자 계정 생성" />
        <meta property="og:url" content={`${window.location.href}`} />
        <meta property="og:description" content="사용자 계정생성" />
      </Helmet>
      <h1
        css={css`
          visibility: hidden;
        `}
      >
        계정 생성
      </h1>

      <BackButton />
      <h2 css={pageTitleStyle}>
        이메일과 비밀번호를
        <br /> 설정해주세요.
      </h2>
      <form noValidate onSubmit={handleSubmit(onSubmit)} css={formStyle}>
        {/* 이메일 */}
        <div css={containerStyle}>
          <Input
            labelName="아이디 (이메일)"
            type="email"
            onChange={(e) => {
              register('email').onChange(e);
              setEmailError('');
              setIsSuccess(false);
            }}
            hasCheckButton
            checkButtonText="중복확인"
            placeholder="이메일 주소를 입력하세요"
            register={register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            })}
            onCheck={handleEmailCheck}
            error={emailError || errors.email?.message?.toString()}
            isValid={isSuccess}
          />

          {/* 비밀번호 */}
          <Input
            labelName="비밀번호"
            type="password"
            placeholder="8자 이상의 비밀번호"
            register={register('password', {
              required: '비밀번호를 입력해주세요',
              validate: (value) => {
                const email = watch('email') || '';
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
            labelName="비밀번호 확인"
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
            variant="deepGray"
            active={isActive}
            disabled={isDisabled}
          />
        </div>
      </form>
    </>
  );
};

export default SignUp;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const buttonStyle = css`
  position: fixed;
  bottom: 3rem;
  width: calc(100% - 3.2rem);
  left: 0;
`;

const pageTitleStyle = css`
  ${TypoTitleMdSb}
  margin: 2.6rem 0 3rem 0;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
`;
