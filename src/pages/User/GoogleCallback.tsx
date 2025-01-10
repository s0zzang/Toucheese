import { useEffect } from 'react';

const GoogleCallback = () => {
  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get('access_token');

  useEffect(() => {
    if (accessToken) handleLogin(accessToken);
  }, [accessToken]);

  const handleLogin = async (accessToken: string) => {
    // api 작업 중
    try {
      const response = await fetch(
        `${import.meta.env.VITE_TOUCHEESE_API}/oauth2/authorization/google`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken,
            redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
          }),
        },
      );

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return <div>로그인 중...</div>;
};

export default GoogleCallback;
