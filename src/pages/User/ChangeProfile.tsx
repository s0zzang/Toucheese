/** @jsxImportSource @emotion/react */

import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import useToast from '@hooks/useToast';
import useSignupStore from '@store/useSignupStore';
import { TypoTitleXsM, TypoTitleXsSB } from '@styles/Common';
import { useLayoutEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const ChangeProfile = () => {
  /** zustand 스토어에 데이터 저장 */
  const { setSignupData } = useSignupStore();
  const [searchParams] = useSearchParams();
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const storedData = sessionStorage.getItem('signup-storage');
  const parsedData = storedData ? JSON.parse(storedData) : null;
  const storageName = parsedData?.state?.username || '';
  const storagePhone = parsedData?.state?.phone || '';
  const openToast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // form 초기값을 sessionStorage 데이터로 설정
    defaultValues: {
      username: storageName,
      phone: storagePhone,
    },
  });

  /** 페이지가 처음 로드될 때 zustand 상태를 react-hook-form에 반영 */
  /** 모바일 - 본인인증 페이지 이동 */
  useLayoutEffect(() => {
    if (searchParams.get('success')) {
      setIsActive(true);
      setIsDisabled(false);
      setSignupData({ username: storageName, phone: storagePhone });
      reset();
    }
  }, []);

  const handleSave = (data: any) => {
    setSignupData(data);
  };

  const handleEditProfile = () => {
    openToast('개인정보 수정 기능을 구현중입니다');
  };

  /** 간편 본인인증 실행 함수 */

  return (
    <>
      <Helmet>
        <title>{`개인정보 변경`}</title>
        <meta property="og:title" content="사용자 개인정보 변경" />
        <meta property="og:url" content={`${window.location.href}`} />
        <meta property="og:description" content="사용자 개인정보 변경" />
      </Helmet>

      <div css={headerStyle}>
        <BackButton />
        <h1>개인정보 변경</h1>
      </div>
      <h2 css={pageTitleStyle}>개인정보</h2>
      <form noValidate onSubmit={handleSubmit(handleSave)} css={formStyle}>
        <div css={containerStyle}>
          {/* 이름 */}
          <Input
            labelName="이름"
            type="name"
            onChange={(e) => {
              setSignupData({ username: e.target.value });
            }}
            placeholder="실명을 입력하세요."
            register={register('username', {
              required: '이름은 필수입니다',
              minLength: {
                value: 2,
                message: '이름은 2자 이상이어야 합니다',
              },
            })}
            error={errors.username?.message?.toString()}
          />

          {/* 휴대폰 번호 */}
          <Input
            labelName="휴대폰 번호"
            type="phone"
            onChange={(e) => {
              setSignupData({ phone: e.target.value });
            }}
            placeholder="‘-’구분없이 입력하세요"
            hasCheckButton
            onCheck={handleEditProfile}
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
          <Button
            onClick={handleEditProfile}
            type="submit"
            text="다음"
            size="large"
            variant="deepGray"
            disabled={isDisabled}
            active={isActive}
          />
        </div>
      </form>
    </>
  );
};

export default ChangeProfile;

const headerStyle = css`
  display: flex;
  margin-bottom: 2rem;

  h1 {
    ${TypoTitleXsM}
    margin-left: 0.8rem;
  }
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 1.2rem;
`;

const buttonStyle = css`
  position: fixed;
  bottom: 3rem;
  width: calc(100% - 3.2rem);
`;

const pageTitleStyle = css`
  ${TypoTitleXsSB}
  height: 5rem;
  display: flex;
  align-items: center;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
`;
