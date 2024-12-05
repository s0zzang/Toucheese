import { useQuery } from '@tanstack/react-query';
import { IStudioRes } from 'types/types';

const fetchStudios = async (page?: String, params?: string): Promise<IStudioRes> => {
  const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/${page}${params && `?${params}`}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.error('Failed to fetch data');
  }

  return response.json();
};

export const useGetStudios = (page?: String, params?: string) => {
  return useQuery({
    queryKey: [''],
  });
};
