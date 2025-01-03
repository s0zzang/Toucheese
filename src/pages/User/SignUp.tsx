/** @jsxImportSource @emotion/react */

import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import { TypoTitleMdSb } from '@styles/Common';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <div css={containerStyle}>
        <BackButton />
        <h2 css={pageTitleStyle}>회원가입</h2>
        <form noValidate onSubmit={handleSubmit(onSubmit)} css={formStyle}>
          {/* 이메일 */}

          <Input
            labelName="아이디 (이메일)"
            type="email"
            placeholder="이메일 주소를 입력하세요"
            register={register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '올바른 이메일 주소를 입력해주세요.',
              },
            })}
            error={errors.email?.message?.toString()}
          />

          {/* 비밀번호 */}
          <Input
            labelName="비밀번호"
            type="password"
            placeholder="8자 이상의 비밀번호"
            register={register('password', {
              required: '비밀번호를 입력해주세요',
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상 입력되어야 합니다.',
              },
              pattern: {
                value: /[!@#$%^&*(),.?":{}|<>]/,
                message: '특수문자를 하나 이상 포함해야 합니다',
              },
            })}
            error={errors.password?.message?.toString()}
          />

          {/* 비밀번호 확인 */}
          <Input
            labelName="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 재입력하세요"
            register={register('password confirm', {
              required: '비밀번호를 재입력하세요',
              validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다',
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상 입력되어야 합니다.',
              },
              pattern: {
                value: /[!@#$%^&*(),.?":{}|<>]/,
                message: '특수문자를 하나 이상 포함해야 합니다',
              },
            })}
            error={errors.password?.message?.toString()}
          />

          {/* 이름 */}
          <Input
            labelName="이름"
            type="name"
            placeholder="실명을 입력하세요."
            register={register('name', {
              required: '이름은 필수입니다',
              minLength: {
                value: 2,
                message: '이름은 2자 이상이어야 합니다',
              },
            })}
            error={errors.name?.message?.toString()}
          />

          {/* 휴대폰 번호 */}

          <Input
            labelName="휴대폰 번호"
            type="phone"
            placeholder="‘-’구분없이 입력하세요"
            register={register('phone', {
              required: '휴대폰 번호는 필수입니다.',
              minLength: {
                value: 11,
                message: '올바른 휴대폰 번호 형식이 아닙니다.',
              },
            })}
            error={errors.phone?.message?.toString()}
          />
        </form>
      </div>
      <div css={buttonStyle}>
        <Button type="submit" text="가입하기" size="large" variant="deepGray" />
      </div>
    </>
  );
};

export default SignUp;

const containerStyle = css`
  position: relative;
`;

const buttonStyle = css`
  position: absolute;
  bottom: 3rem;
  width: calc(100% - 3.2rem);
`;

const pageTitleStyle = css`
  ${TypoTitleMdSb}
  margin: 2.6rem 0 3rem 0;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
