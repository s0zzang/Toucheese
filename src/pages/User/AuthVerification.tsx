/** @jsxImportSource @emotion/react */

import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import useSignupStore from '@store/useSignupStore';
import { TypoTitleMdSb } from '@styles/Common';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface AuthVerificationType {
  success: boolean;
  imp_uid: string;
  merchant_uid: string;
  pg_provider: 'inicis_unified';
  pg_type: 'certification';
  error_code: string;
  error_msg: string;
}

const IMPCode = import.meta.env.VITE_AUTH_IMP_CODE;
const channelKey = import.meta.env.VITE_AUTH_CHANNEL_KEY;
const AuthRedirectURI = import.meta.env.VITE_AUTH_REDIRECT_URI;

const AuthVerification = () => {
  /** zustand 스토어에 데이터 저장 */
  const { setSignupData, phone, name } = useSignupStore();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const handleSave = (data: any) => {
    setSignupData(data);
    console.log('현재상태 :', useSignupStore.getState(), '데이터 저장 완료 :', phone, name);
  };

  /** 간편 본인인증 실행 함수 */
  const handleAuth = () => {
    const { IMP } = window;
    IMP.init(IMPCode);

    IMP.certification(
      {
        channelKey: channelKey,
        merchant_uid: 'test_m5nmk62j',
        m_redirect_url: AuthRedirectURI,
      },
      async (res: AuthVerificationType) => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  /** 페이지가 처음 로드될 때 zustand 상태를 react-hook-form에 반영 */
  useEffect(() => {
    setValue('phone', phone);
    setValue('name', name);
    console.log('useEffect => phone, name:', phone, name);
  }, [phone, name, setValue]);

  const ButtonActive = () => (name && phone ? setIsActive(true) : setIsActive(false));
  return (
    <>
      <Helmet>
        <title>{`회원가입 - 본인인증`}</title>
        <meta property="og:title" content="사용자 본인인증" />
        <meta property="og:url" content={`${window.location.href}`} />
        <meta property="og:description" content="사용자 본인인증" />
      </Helmet>

      <BackButton />
      <h1 css={pageHeaderStyle}>본인인증</h1>
      <h2 css={pageTitleStyle}>
        이름과 휴대폰 번호를
        <br />
        알려주세요
      </h2>
      <form noValidate onSubmit={handleSubmit(handleSave)} css={formStyle}>
        <div css={containerStyle}>
          {/* 이름 */}
          <Input
            labelName="이름"
            type="name"
            value={name}
            onChange={(e) => {
              console.log('이름 변경:', e.target.value);
              setSignupData({ name: e.target.value });
              register('email').onChange(e);
            }}
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
            value={phone}
            onChange={(e) => {
              console.log('폰번호 변경:', e.target.value);
              setSignupData({ phone: e.target.value });
              register('email').onChange(e);
            }}
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
          <Button
            onClick={() => navigate('/user/signup')}
            type="submit"
            text="다음"
            size="large"
            variant="deepGray"
            disabled={true}
            active={false}
          />
        </div>
      </form>
    </>
  );
};

export default AuthVerification;

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

const pageHeaderStyle = css`
  visibility: hidden;
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
