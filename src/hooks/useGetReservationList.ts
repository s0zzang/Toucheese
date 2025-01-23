import { defaultUserState } from '@store/useUserStore';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getLocalStorageItem } from '@utils/getLocalStorageItem';
import { IResvItem, IResvRes, IUser } from 'types/types';

export type ResStatus = 'DEFAULT' | 'RESERVED' | 'COMPLETED' | 'CANCELED';

// 예약 상태 별 예약 내역을 불러오는 hook
const fetchReservationList = async (status: ResStatus): Promise<IResvRes> => {
  const { accessToken } = getLocalStorageItem<IUser>('userState', defaultUserState);
  const newStatus = status.toLowerCase();

  // 이용 완료, 예약 취소 --> 임시 데이터
  const reserved: IResvItem[] = [
    {
      reservationId: 11,
      studioId: 146,
      studioName: '주 스튜디오',
      menuId: 71,
      menuName: '증명사진',
      date: '2025-01-09',
      startTime: '12:00:00',
      menuImgUrl: 'https://placehold.co/600x400',
      status: 'RESERVED',
    },
  ];
  const completed: IResvItem[] = [
    {
      reservationId: 8,
      studioId: 146,
      studioName: '주 스튜디오',
      menuId: 71,
      menuName: '증명사진',
      date: '2023-12-01',
      startTime: '14:00:00',
      menuImgUrl: 'https://placehold.co/600x400',
      status: 'COMPLETED',
      review: {
        rating: 4,
        content: '좋았어요',
      },
    },
    {
      reservationId: 10,
      studioId: 146,
      studioName: '주 스튜디오',
      menuId: 71,
      menuName: '증명사진',
      date: '2023-12-01',
      startTime: '14:00:00',
      menuImgUrl: 'https://placehold.co/600x400',
      status: 'COMPLETED',
    },
  ];
  const canceled: IResvItem[] = [];

  if (newStatus === 'reserved') return reserved;
  else if (newStatus === 'completed') return completed;
  else if (newStatus === 'canceled') return canceled;

  const response = await fetch(
    `${import.meta.env.VITE_TOUCHEESE_API}/user/mypage/reservation${newStatus !== 'default' ? `/${newStatus}` : ''}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    console.error('Failed to fetch data');
  }

  return response.json();
};

export const useGetReservationList = (resStatus: ResStatus): UseQueryResult<IResvRes> => {
  return useQuery({
    queryKey: ['reservation', { resStatus }],
    queryFn: () => fetchReservationList(resStatus),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
    retry: 3,
  });
};
