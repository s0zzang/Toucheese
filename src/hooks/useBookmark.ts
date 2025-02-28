// userId === 1 => 로그인/회원가입 시 변경 예정
const postBookmark = async (userId: number = 1, studioId: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_TOUCHEESE_API}/user/bookmark/${userId}/${studioId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to add bookmark');
  }
};

const deleteBookmark = async (userId: number = 1, studioId: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_TOUCHEESE_API}/user/bookmark/${userId}/${studioId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to delete bookmark');
  }
};

const useBookmark = (isBookmarked: boolean) => {
  return isBookmarked ? deleteBookmark : postBookmark;
};

export default useBookmark;
