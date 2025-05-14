/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import { css } from '@emotion/react';
import { TypoBodyMdR, TypoTitleMdSb } from '@styles/Common';
import variables from '@styles/Variables';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const SignupSuccess = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/user/auth');
  };

  return (
    <>
      <Helmet>
        <title>{`회원가입 - 회원가입 완료`}</title>
        <meta property="og:title" content="사용자 회원가입 완료" />
        <meta property="og:url" content={`${window.location.href}`} />
        <meta property="og:description" content="사용자 회원가입 완료" />
      </Helmet>
      <h1
        css={css`
          visibility: hidden;
        `}
      >
        회원가입 완료
      </h1>
      <div css={sucessTitleStyle}>
        <img src="/img/icon-complete-cheese500.svg" alt="회원가입 완료 아이콘" />
        <h2>
          회원가입이
          <br />
          완료되었습니다!
        </h2>
        <p>
          지금 바로 내 인생 사진관을 찾고
          <br />
          예약까지 완료해보세요.
        </p>
      </div>
      <div css={buttonStyle}>
        <Button text="로그인" variant="black" size="large" onClick={handleLogin} />
      </div>
    </>
  );
};

const sucessTitleStyle = css`
  padding-top: 7.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
  justify-content: center;

  h2 {
    ${TypoTitleMdSb}
  }

  p {
    ${TypoBodyMdR}
    color: ${variables.colors.gray800};
  }
`;

const buttonStyle = css`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.8rem 1.6rem 3rem 1.6rem;
  border-top: 0.16rem solid ${variables.colors.gray300};
`;

export default SignupSuccess;
