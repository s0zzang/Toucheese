import { useGetStudios } from '@hooks/useGetStudios';
import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { IStudioItem } from 'types/types';
import StudioItem from './StudioItem';

const StudioList = ({ mode, params }: { mode: 'filter' | 'search/result'; params: string }) => {
  const [pageNum, setPageNum] = useState(0);
  const [items, setItems] = useState<IStudioItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isFetching } = useGetStudios(pageNum, mode, params);

  useEffect(() => {
    if (data?.content) {
      setItems((prevItems) => [...prevItems, ...data.content]);
      if (data.pageable.pageNumber === data.totalPages - 1) {
        setHasMore(false);
      }
    }
  }, [data]);

  const loadMore = () => {
    if (hasMore && !isLoading && !isFetching) {
      setPageNum((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <Virtuoso
        data={items}
        useWindowScroll
        totalCount={items.length}
        endReached={loadMore}
        overscan={10}
        itemContent={(index, item) => <StudioItem key={item.id} item={item} isFirst={index === 0} isLast={index === items.length - 1} />}
      />
    </>
  );
};

export default StudioList;
