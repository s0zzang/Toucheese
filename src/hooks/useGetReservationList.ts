import { defaultUserState } from '@store/useUserStore';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getLocalStorageItem } from '@utils/getLocalStorageItem';
import { IResvRes, IUser } from 'types/types';

export type ResStatus = 'DEFAULT' | 'RESERVED' | 'COMPLETED' | 'CANCELED';

// 예약 상태 별 예약 내역을 불러오는 hook
const fetchReservationList = async (
  status: ResStatus,
  accessToken: string,
): Promise<IResvRes | null> => {
  const newStatus = status.toLowerCase();
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
    throw new Error('Failed to fetch data');
  }

  const data = await response.json().catch(() => null);

  if (!data) {
    return null;
  }

  return data;
};

export const useGetReservationList = (resStatus: ResStatus): UseQueryResult<IResvRes> => {
  const { accessToken } = getLocalStorageItem<IUser>('userState', defaultUserState);

  if (!accessToken) {
    throw new Error('유저 정보가 존재하지 않습니다.');
  }

  return useQuery({
    queryKey: ['reservation', { resStatus, accessToken }],
    queryFn: () => fetchReservationList(resStatus, accessToken),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message === 'Failed to fetch data') {
        return false;
      }
      return failureCount < 3; // 최대 3번까지 재시도
    },
    throwOnError: true,
  });
};
