/** @jsxImportSource @emotion/react */
import { Helmet } from 'react-helmet-async';
import Header from '@components/Header/Header';
import { css } from '@emotion/react';
import LoginTypeButton from './components/LoginTypeButton';
import { Link, useNavigate } from 'react-router-dom';
import variables from '@styles/Variables';

const Auth = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    // const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
    // const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    window.location.href = `https://www.toucheeseapi.shop/oauth2/authorization/kakao`;
  };

  return (
    <>
      <Helmet>
        <title>터치즈 - 로그인/회원가입</title>
        <meta name="description" content="터치즈에서 간편하게 내 인생 사진관을 찾고 예약하세요!" />
        <meta property="og:title" content="터치즈 - 로그인/회원가입" />
        <meta
          property="og:description"
          content="터치즈에서 간편하게 내 인생 사진관을 찾고 예약하세요!"
        />
      </Helmet>

      <div
        css={css`
          margin-bottom: 5.3rem;
        `}
      >
        <Header title="로그인/회원가입" />
      </div>

      <div css={LoginPageDesStyle}>
        <h1
          css={css`
            opacity: 0;
            animation: fadeIn 0.5s ease-in forwards;
          `}
        >
          터치즈에서 간편하게
        </h1>
        <p
          css={css`
            opacity: 0;
            animation: fadeIn 0.5s ease-in forwards;
            animation-delay: 0.5s;
          `}
        >
          내 인생 사진관 찾고 예약까지!
        </p>
      </div>

      <div css={LoginTypeButtonWrapper}>
        <LoginTypeButton type="kakao" onClick={handleKakaoLogin} />
        <LoginTypeButton type="google" />
        <LoginTypeButton type="email" onClick={() => navigate('/user/AuthVerification')} />
      </div>

      <Link to="/login">
        <div css={LoginLinkStyle}>
          <span
            css={css`
              color: ${variables.colors.gray700};
            `}
          >
            이미 가입하셨나요?
          </span>
          <span
            css={css`
              color: ${variables.colors.black};
            `}
          >
            로그인 하기
          </span>
        </div>
      </Link>
    </>
  );
};

export default Auth;

const LoginPageDesStyle = css`
  h1 {
    font-size: 2.2rem;
    font-weight: 700;
  }
  p {
    font-size: 2.2rem;
  }
  margin-bottom: 10.2rem;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LoginTypeButtonWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 40%;
`;
const LoginLinkStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 6rem;
  left: 0;
  right: 0;
`;
