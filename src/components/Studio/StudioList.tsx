/** @jsxImportSource @emotion/react */

import Loading from '@components/Loading/Loading';
import NoResult from '@components/NoResult/NoResult';
import { useGetStudios } from '@hooks/useGetStudios';
import { decodeSearchParamsToString } from '@utils/decodeSearchParams';
import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { IStudioItem } from 'types/types';
import StudioItem from './StudioItem';
import { Hidden } from '@styles/Common';

const StudioList = ({
  mode,
  searchParams,
  onResultCount,
}: {
  mode: 'filter' | 'search/result';
  searchParams: URLSearchParams;
  onResultCount?: (count: number) => void;
}) => {
  const params = decodeSearchParamsToString(searchParams);
  const [pageNum, setPageNum] = useState(0);
  const [items, setItems] = useState<IStudioItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isFetching } = useGetStudios(pageNum, mode, params);

  // params 변경 시 기존 리스트 초기화
  useEffect(() => {
    setItems([]);
    setPageNum(0);
    setHasMore(true);
  }, [params]);

  useEffect(() => {
    if (data?.content) {
      setItems((prevItems) => [...prevItems, ...data.content]);
      if (data.pageable.pageNumber === data.totalPages - 1) {
        setHasMore(false);
      }
    }
  }, [data]);

  useEffect(() => {
    onResultCount?.(items.length);
  }, [items, onResultCount]);

  const loadMore = () => {
    if (hasMore && !isLoading && !isFetching) {
      setPageNum((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      {pageNum === 0 && isLoading ? (
        <Loading size="small" phrase="스튜디오를 불러오고 있습니다." />
      ) : (
        <>
          {data?.content.length === 0 ? (
            <NoResult
              message={
                mode === 'filter' ? (
                  <>
                    선택한 필터의 검색 결과가 없습니다.
                    <br />
                    다른 필터로 변경해보세요.
                  </>
                ) : (
                  <>스튜디오 검색 결과가 없습니다.</>
                )
              }
            />
          ) : (
            <>
              <h2 css={Hidden}>스튜디오 목록</h2>
              <Virtuoso
                data={items}
                useWindowScroll
                totalCount={items.length}
                endReached={loadMore}
                overscan={10}
                itemContent={(index, item) => (
                  <StudioItem
                    key={item.id}
                    item={item}
                    isFirst={index === 0}
                    isLast={index === items.length - 1}
                  />
                )}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default StudioList;
