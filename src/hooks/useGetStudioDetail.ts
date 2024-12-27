import { useQuery } from '@tanstack/react-query';
import { IStudioDetail } from 'types/types';

const fetchStudioDetail = async (studioId: string): Promise<IStudioDetail> => {
  const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/${studioId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('error: data fetch error');
  }
  return response.json();
};

export const useGetStudioDetail = (studioId: string) => {
  return useQuery<IStudioDetail | undefined>({
    queryKey: ['studioDetail', studioId],
    queryFn: () => fetchStudioDetail(studioId),
    staleTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: false,
    gcTime: 5 * 60 * 1000,
    enabled: !!studioId,
    // placeholderData: true,
  });
};
