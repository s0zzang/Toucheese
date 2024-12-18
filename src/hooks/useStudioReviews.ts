// 스튜디오 리뷰 조회 API
export const getStudioReviews = async (studioId: string) => {
  const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/${studioId}/reviews`);
  if (!response.ok) {
    throw new Error('리뷰를 불러오는데 실패했습니다');
  }
  return response.json();
};
