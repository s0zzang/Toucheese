import { defaultUserState } from '@store/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { getLocalStorageItem } from '@utils/getLocalStorageItem';
import { IStudioDetail, IUser } from 'types/types';

const fetchStudioDetail = async (
  studioId: string,
  accessToken: string | null,
): Promise<IStudioDetail> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/${studioId}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error('error: data fetch error');
  }
  return response.json();
};

export const useGetStudioDetail = (studioId: string) => {
  const { accessToken } = getLocalStorageItem<IUser>('userState', defaultUserState);

  return useQuery<IStudioDetail | undefined>({
    queryKey: ['studioDetail', { studioId, accessToken }],
    queryFn: () => fetchStudioDetail(studioId, accessToken),
    staleTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: false,
    gcTime: 5 * 60 * 1000,
    enabled: !!studioId,
    // placeholderData: true,
  });
};
