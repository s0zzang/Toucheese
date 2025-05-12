import useToast from '@hooks/useToast';
import { useUserStore } from '@store/useUserStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const openToast = useToast();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    const handleKakaoLogin = async () => {
      try {
        if (!code) {
          throw new Error('인증 코드를 찾을 수 없습니다.');
        }

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

        if (result.accessToken) {
          setUser(result);
          openToast('로그인 성공!');
          navigate('/', { replace: false });
        } else {
          navigate('/user/AuthVerification', {
            replace: false,
            state: result,
          });
        }
      } catch (error) {
        console.error('카카오 로그인 에러:', error);
        navigate('/user/auth');
      }
    };

    handleKakaoLogin();
  }, [navigate]);

  return <div>로그인 처리중...</div>;
};

export default KakaoCallback;
