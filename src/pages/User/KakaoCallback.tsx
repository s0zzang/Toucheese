import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log(code);

    const handleKakaoLogin = async () => {
      try {
        if (!code) return;

        const response = await fetch(
          `${import.meta.env.VITE_TOUCHEESE_API}/user/auth/kakao/callback`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          },
        );

        const result = await response.json();
        console.log(result);
        // 로그인 성공 시 useUserStore의 상태를 업데이트
        // 회원가입 된 계정이 없는 경우는 회원가입
        navigate('/');
      } catch (error) {
        console.error('카카오 로그인 에러:', error);
        navigate('/login');
      }
    };

    handleKakaoLogin();
  }, [navigate]);

  return <div>로그인 처리중...</div>;
};

export default KakaoCallback;
