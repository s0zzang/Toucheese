/** @jsxImportSource @emotion/react */

import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import { TypoTitleMdSb } from '@styles/Common';
import { useForm } from 'react-hook-form';

const IMPCode = import.meta.env.VITE_AUTH_IMP_CODE;
const channelKey = import.meta.env.VITE_AUTH_CHANNEL_KEY;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  /** 간편 본인인증 실행 함수 */
  const handleAuth = () => {
    const { IMP } = window;
    IMP.init(IMPCode);

    IMP.certification(
      {
        channelKey: channelKey,
        merchant_uid: 'test_m5nmk62j',
        m_redirect_url: 'http://localhost:5173',
        popup: true,
      },
      async (res: {
        success: boolean;
        imp_uid: string;
        merchant_uid: string;
        pg_provider: 'inicis_unified';
        pg_type: 'certification';
        error_code: string;
        error_msg: string;
      }) => {
        try {
          if (res.success) {
            console.log(res);
          }
        } catch (err) {
          console.error(err);
        }
      },
    );
  };

  return (
    <>
      <BackButton />
      <h2 css={pageTitleStyle}>회원가입</h2>
      <form noValidate onSubmit={handleSubmit(onSubmit)} css={formStyle}>
        {/* 이메일 */}
        <div css={containerStyle}>
          <Input
            labelName="아이디 (이메일)"
            type="email"
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
            error={errors.email?.message?.toString()}
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
            onCheck={handleAuth}
            hasCheckButton
            checkButtonText="인증하기"
            register={register('phone', {
              required: '휴대폰 번호는 필수입니다.',
              minLength: {
                value: 11,
                message: '올바른 휴대폰 번호 형식이 아닙니다.',
              },
            })}
            error={errors.phone?.message?.toString()}
          />
        </div>

        <div css={buttonStyle}>
          <Button type="submit" text="가입하기" size="large" variant="deepGray" />
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
