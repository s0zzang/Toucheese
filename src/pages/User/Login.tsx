/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
// import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { TypoTitleSmS } from '@styles/Common';
import Input from '@components/Input/Input';

const Login = () => {
  return (
    <>
      <div
        css={css`
          margin-bottom: 3rem;
        `}
      >
        <Header title="로그인/회원가입" />
      </div>

      <div css={LoginPageDesStyle}>
        <h1>터치즈에서 간편하게</h1>
        <p>내 인생 사진관 찾고 예약까지!</p>
      </div>

      <Input labelName="이메일(아이디)" type="email" placeholder="toucheese.gmail.com" />
      <Input labelName="비밀번호" type="password" placeholder="8자 이상의 비밀번호" />
    </>
  );
};

export default Login;

const LoginPageDesStyle = css`
  h1 {
    ${TypoTitleSmS}
  }
  p {
    font-size: 1.8rem;
  }
  margin-bottom: 3.4rem;
`;
