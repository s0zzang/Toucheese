/** @jsxImportSource @emotion/react */
import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import useToast from '@hooks/useToast';
import { PCLayout, TypoTitleMdSb, TypoTitleXsM, TypoTitleXsSb } from '@styles/Common';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { loadUserFromStorage, useUserStore } from '@store/useUserStore';
import { useNavigate } from 'react-router-dom';
import variables from '@styles/Variables';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import useModal from '@hooks/useModal';

const PasswordConfirm = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const openToast = useToast();
  const { email } = useUserStore();
  const navigate = useNavigate();
  const modal = useModal(5);

  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password');

  useEffect(() => {
    setIsActive(password);
    setIsDisabled(!password);
  }, [password]);

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const handleEditUser = async () => {
    const formData = {
      email,
      password,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }
      modal.close();
      navigate('/user/profile/passwordChange');
    } catch (error) {
      console.error('비밀번호 확인 중 오류 발생:', error);
      openToast('비밀번호 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Helmet>
        <title>{`비밀번호 변경`}</title>
        <meta property="og:title" content="사용자 비밀번호 변경" />
        <meta property="og:url" content={`${window.location.href}`} />
        <meta property="og:description" content="사용자 비밀번호 변경" />
      </Helmet>
      <div css={passwordConfirmWrapper}>
        <div css={MOheaderStyle}>
          <BackButton />
          <h1>비밀번호 입력</h1>
        </div>
        <div css={PCheaderStyle}>
          <h1>비밀번호 입력</h1>
        </div>
        <h2 css={pageTitleStyle}>
          정보를 안전하게 보호하기 위해
          <br />
          비밀번호를 다시 한 번 입력해주세요
        </h2>
        <form
          noValidate
          css={formStyle}
          onSubmit={(e) => {
            e.preventDefault();
            handleEditUser();
          }}
        >
          <div css={containerStyle}>
            {/* 비밀번호 */}
            <Input
              labelName="비밀번호"
              type="password"
              placeholder="8자 이상의 비밀번호"
              register={register('password', {
                required: '비밀번호를 입력해주세요',
                validate: (value) => {
                  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/.test(value)) {
                    return '8~20자 영문/숫자 조합으로 입력해주세요.';
                  }

                  return true;
                },
              })}
              error={errors.password?.message?.toString()}
            />
          </div>
        </form>

        <div css={buttonStyle}>
          <Button
            onClick={handleEditUser}
            type="submit"
            text="다음"
            width="max"
            size="large"
            variant="gray"
            disabled={isDisabled}
            active={isActive}
          />
        </div>
      </div>
    </>
  );
};

export default PasswordConfirm;

const passwordConfirmWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  gap: 1.2rem;
  padding-top: ${variables.headerHeight};

  ${mqMin(breakPoints.pc)} {
    ${PCLayout}
    min-width:  60.8rem;
    max-width: 60.8rem;
    padding: 4rem 1.6rem 0;
    margin: 0 auto 0 31rem;
  }
`;

const MOheaderStyle = css`
  position: relative;
  display: flex;
  height: 5rem;
  align-items: center;

  h1 {
    ${TypoTitleXsM}
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  ${mqMin(breakPoints.pc)} {
    display: none;
  }
`;

const PCheaderStyle = css`
  display: none;

  h1 {
    ${TypoTitleMdSb}
    margin-bottom: 4.2rem;
  }

  ${mqMin(breakPoints.pc)} {
    margin-bottom: 3.2rem;
    display: contents;
  }
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const buttonStyle = css`
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 0 ${variables.layoutPadding};

  ${mqMin(breakPoints.pc)} {
    left: calc(max((100vw - 1280px) / 2, 0px) + 32rem);
    transform: none;
    width: auto;

    & > button {
      min-width: 60rem;
      max-width: 60rem;
      width: 100%;
    }
  }
`;

const pageTitleStyle = css`
  ${TypoTitleXsSb}
  padding: 1rem 0;
  display: flex;
  align-items: center;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
`;
