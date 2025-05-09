import { useEffect, useState } from 'react';

const GoogleCallback = () => {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codeParams = new URLSearchParams(window.location.search).get('code');

    if (codeParams) {
      setCode(codeParams);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (code) {
      handleLogin(code);
    }
  }, [code]);

  const handleLogin = async (code: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_TOUCHEESE_API}/user/auth/google/callback`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
          }),
        },
      );

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>로그인 중...</div>;
  }

  return <div>로그인 완료</div>;
};

export default GoogleCallback;
