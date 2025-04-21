import { Theme } from '@pages/User/BookmarkedStudios';
import { defaultUserState } from '@store/useUserStore';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getLocalStorageItem } from '@utils/getLocalStorageItem';
import { IStudioItem, IUser } from 'types/types';

const fetchBookmarkList = async (
  theme: Theme,
  accessToken: string,
): Promise<IStudioItem[] | undefined> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/user/bookmark`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('403');
      }

      throw new Error('Failed: Unknown error');
    }

    const data: IStudioItem[] = await response.json().catch(() => {
      return null;
    });

    const filteredData =
      theme === '전체'
        ? data
        : data.filter((item: IStudioItem) => item.vibe === theme || item.subVibe === theme);

    return filteredData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const useGetBookmarkList = (theme: Theme): UseQueryResult<IStudioItem> => {
  const { accessToken } = getLocalStorageItem<IUser>('userState', defaultUserState);

  if (!accessToken) {
    throw new Error('AccessToken이 존재하지 않습니다!');
  }

  return useQuery({
    queryKey: ['bookmark', { theme }],
    queryFn: () => fetchBookmarkList(theme, accessToken),
    enabled: !!accessToken,
  });
};

export default useGetBookmarkList;
