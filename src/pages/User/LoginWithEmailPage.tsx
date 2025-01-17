/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import { TypoTitleSmS } from '@styles/Common';
import variables from '@styles/Variables';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import useToast from '@hooks/useToast';
import { useUserStore } from '@store/useUserStore';

const LoginWithEmailPage = () => {
  const navigate = useNavigate();
  const openToast = useToast();
  const setUser = useUserStore((state) => state.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //TODO - 리액트 쿼리 뮤테이트로 변경 해야함
  const handleLogin = async (data: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      console.log('로그인 성공:', result);
      setUser(result);
      openToast('로그인에 성공했습니다.');
      navigate('/');
    } catch (error) {
      console.error('로그인 에러:', error);
      openToast('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <Helmet>
        <title>이메일로 로그인 - 터치즈</title>
        <meta
          name="description"
          content="터치즈에서 이메일로 로그인하세요. 내 인생 사진관을 찾고 예약까지 한 번에!"
        />
        <meta property="og:title" content="이메일로 로그인 - 터치즈" />
        <meta
          property="og:description"
          content="터치즈에서 이메일로 로그인하세요. 내 인생 사진관을 찾고 예약까지 한 번에!"
        />
      </Helmet>

      <div
        css={css`
          margin-bottom: 4rem;
        `}
      >
        <Header title="이메일로 로그인" />
      </div>

      <div css={LoginPageDesStyle}>
        <h1>터치즈에서 간편하게</h1>
        <p>내 인생 사진관 찾고 예약까지!</p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(handleLogin)}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `}
      >
        <Input
          labelName="이메일(아이디)"
          type="email"
          placeholder="toucheese@gmail.com"
          register={register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '올바른 이메일 주소를 입력해주세요.',
            },
          })}
          error={errors.email?.message?.toString()}
        />
        <Input
          labelName="비밀번호"
          type="password"
          placeholder="8자 이상의 비밀번호"
          register={register('password', {
            required: '비밀번호를 입력해주세요',
            minLength: {
              value: 8,
              message: '아이디와 비밀번호를 확인해주세요.',
            },
            pattern: {
              value: /[!@#$%^&*(),.?":{}|<>]/,
              message: '특수문자를 하나 이상 포함해야 합니다',
            },
          })}
          error={errors.password?.message?.toString()}
        />

        <button
          type="submit"
          css={css`
            width: 100%;
            background-color: ${variables.colors.gray900};
            color: ${variables.colors.white};
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0.8rem;
            margin-top: 4.8rem;
            height: 4.8rem;
            padding: 12 0px;
          `}
        >
          로그인
        </button>
      </form>
    </>
  );
};

export default LoginWithEmailPage;

const LoginPageDesStyle = css`
  h1 {
    ${TypoTitleSmS}
  }
  p {
    font-size: 1.8rem;
  }
  margin-bottom: 3.4rem;
`;
