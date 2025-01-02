/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import Input from '@components/Input/Input';
// import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { TypoTitleSmS } from '@styles/Common';

const LoginWithEmailPage = () => {
  return (
    <>
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

      <Input labelName="이메일(아이디)" type="email" placeholder="toucheese.gmail.com" />
      <Input labelName="비밀번호" type="password" placeholder="8자 이상의 비밀번호" />
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
