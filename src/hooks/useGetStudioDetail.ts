import { useQuery } from '@tanstack/react-query';

interface MenuItem {
  id: number;
  studio: string;
  name: string;
  description: string;
  price: number;
}

interface PortfolioItem {
  created_at: string;
  description: string;
  id: number;
  name: string;
  studio: string;
  update_at: null;
  url: string;
  vive: string;
}

interface StudioDetail {
  id: number;
  name: string;
  adress: string;
  addressGu: string;
  addressSi: string;
  bookmark: boolean;
  bookmark_count: number;
  open_time: string;
  close_time: string;
  phone: string;
  day_of_week: string;
  created_at: null;
  description: string;
  latitude: null;
  longitude: null;
  menus: MenuItem[];
  options: [];
  portfolios: PortfolioItem[];
  rating: number;
  review_count: number;
  subVibe: string;
  update_at: null;
  vibe: string;
  view_count: number;
}

const fetchStudioDetail = async (studioId: String): Promise<StudioDetail> => {
  const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/${studioId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.error('Faild to fetch Studio Detail data');
  }
  return response.json();
};

export const useGetStudioDetail = (studioId: String) => {
  return useQuery<StudioDetail | undefined>({
    queryKey: ['studioDetail'],
    queryFn: () => fetchStudioDetail(studioId),
    staleTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: false,
    // placeholderData: true,
  });
};
