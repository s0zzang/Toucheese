import variables from '@styles/Variables';

type LoginButtonProps = {
  type: 'kakao' | 'google' | 'email';
};

const LoginTypeButton = ({ type }: LoginButtonProps) => {
  const buttonStyle = {
    kakao: {
      backgroundColor: '#FEE500',
      color: '#000000',
    },
    google: {
      backgroundColor: `#F2F4F6`,
      color: '#000000',
    },
    email: {
      backgroundColor: `${variables.colors.gray900}`,
      color: `${variables.colors.white}`,
    },
  };

  const buttonText = {
    kakao: '카카오로 계속하기',
    google: '구글로 계속하기',
    email: '이메일로 계속하기',
  };

  const iconSrc = {
    kakao: '/img/icon-kakaoSymbol.svg',
    google: '/img/icon-googleSymbol.svg',
    email: '/img/icon-emailSymbol.svg',
  };

  return (
    <button
      style={{
        width: '100%',
        height: '4.8rem',
        fontSize: '1.6rem',
        padding: '12 0px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        ...buttonStyle[type],
      }}
    >
      <img src={iconSrc[type]} alt="" style={{ width: '24px', height: '24px' }} />
      {buttonText[type]}
    </button>
  );
};

export default LoginTypeButton;
