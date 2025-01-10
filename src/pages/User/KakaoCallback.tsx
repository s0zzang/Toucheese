import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    console.log(code);

    if (code) {
      // 백엔드 서버에 인가 코드를 전송하여 토큰을 받아옵니다
      fetch(`${import.meta.env.VITE_TOUCHEESE_API}/user/auth/kakao/callback?code=${code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // 토큰을 로컬 스토리지에 저장
          localStorage.setItem('token', data.token);
          navigate('/'); // 메인 페이지로 이동
        })
        .catch((error) => {
          console.error('카카오 로그인 에러:', error);
          navigate('/login');
        });
    }
  }, [navigate]);

  return <div>로그인 처리중...</div>;
};

export default KakaoCallback;
