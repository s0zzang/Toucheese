import { ResStatus } from '@pages/Reservation/ReservationList';
import { useQuery } from '@tanstack/react-query';

// 예약 상태 별 예약 내역을 불러오는 hook
// api 완성되면 연동
const fetchReservationList = async (resStatus: ResStatus, accessToken: string) => {
  console.log(accessToken);

  const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/${resStatus}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: Bearer ${accessToken}
    },
  });

  if (!response.ok) {
    console.error('Failed to fetch data');
  }

  return response.json();
};

export const useGetReservationList = (resStatus: ResStatus, accessToken: string) => {
  return useQuery({
    queryKey: [resStatus],
    queryFn: () => fetchReservationList(resStatus, accessToken),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });
};
