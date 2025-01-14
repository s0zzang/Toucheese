import { useUserStore } from '@store/useUserStore';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const logout = useUserStore((state) => state.resetUser);
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <h1>마이페이지</h1>
      <button type="button" onClick={handleClick}>
        로그아웃
      </button>
    </>
  );
};

export default MyPage;
