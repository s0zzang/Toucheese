/** @jsxImportSource @emotion/react */

import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import { TypoTitleMdSb } from '@styles/Common';
import { useForm } from 'react-hook-form';
import useSignupStore from '@store/useSignupStore';

const SignUp = () => {
  /** react-hook-form */
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  /** zustand 스토어에 데이터 저장 */
  // 이후 사용될 Phone, name 추가 호출 필요
  const { setSignupData } = useSignupStore();

  const handleVerifyComplete = () => {
    console.log('본인인증 완료');
  };

  const onSubmit = (data: any) => {
    setSignupData(data);
  };

  /** local storage에 저장된 전화번호, 이름 불러오기 */
  const loadLocalStorageData = (key: string) => {
    /** key에 해당하는 데이터 호출 */
    const localData = localStorage.getItem(key);
    if (!localData) {
      return null;
    }
    /** 문자열로 저장된 데이터 객체로 변환 */
    try {
      const parsedData = JSON.parse(localData);
      return parsedData;
    } catch (error) {
      console.error('JSON 파싱 오류', error);
      return null;
    }
  };
  loadLocalStorageData('signup-storage');

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
            onChange={(e) => {
              console.log('이메일 변경:', e.target.value);
              register('email').onChange(e);
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
        </div>

        <div css={buttonStyle}>
          <Button
            onClick={handleVerifyComplete}
            type="submit"
            text="가입하기"
            size="large"
            variant="deepGray"
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
