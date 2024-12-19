import { useQuery } from '@tanstack/react-query';
import { IStudioItem } from 'types/types';

const fetchStudioDetail = async (studioId: string): Promise<IStudioItem> => {
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
  return useQuery<IStudioItem | undefined>({
    queryKey: ['studioDetail'],
    queryFn: () => fetchStudioDetail(studioId),
    staleTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: false,
    // placeholderData: true,
  });
};
