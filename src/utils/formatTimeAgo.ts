// 시간 변환 해주는 유틸 함수
// "2024-12-13T05:29:35.219594" => 하루전 , 이틀전 등
export const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const createdDate = new Date(dateString);
  const diffDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays === 1) return '어제';
  if (diffDays === 2) return '이틀 전';
  if (diffDays < 7) return `${diffDays}일 전`;

  // 7일 이상인 경우 날짜 형식으로 표시
  return `${createdDate.getFullYear()}.${createdDate.getMonth() + 1}.${createdDate.getDate()}`;
};
