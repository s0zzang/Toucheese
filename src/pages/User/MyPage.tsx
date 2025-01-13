import { useUserStore } from '@store/useUserStore';

const MyPage = () => {
  const logout = useUserStore((state) => state.removeUser);

  const handleClick = () => {
    logout();
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
