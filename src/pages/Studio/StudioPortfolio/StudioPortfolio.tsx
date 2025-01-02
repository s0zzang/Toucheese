/** @jsxImportSource @emotion/react */

import Button from '@components/Button/Button';
import Header from '@components/Header/Header';
import MasonryList from '@components/Masonry/Masonry';
import EmptyMessage from '@components/Message/EmptyMessage';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import { css } from '@emotion/react';
import useModal from '@hooks/useModal';
import { useDimSwiperStore } from '@store/useDimSwiper';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { IPortfolio, IStudioRes } from 'types/types';
import DimmedModal from '../components/DimmedModal';
import PortfolioSwiper from './PortfolioSwiper';

interface IPortfolioResponse {
  menuIdList: number[];
  menuNameList: string[];
  portfolioDtos: IStudioRes<IPortfolio>;
  studioName: string;
}

const StudioPortfolio = () => {
  const { _id } = useParams() as { _id: string };
  const [params, setSearchParams] = useSearchParams();
  const { open } = useModal(1);

  const setSelectedId = useDimSwiperStore((state) => state.setSelectedId);

  const handleClick = (clickedId: number) => {
    setSelectedId(clickedId);
    open();
  };

  const changeParams = (param: string | number) => {
    if (param === 'all') setSearchParams({});
    else setSearchParams({ menuId: `${param}` });
  };

  const fetchPortfolio = async () => {
    const base = `${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/${_id}/portfolio`;
    const finalURL = `${base}${params ? `?${params.toString()}` : ''}`;

    try {
      const response = await fetch(finalURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (err) {
      console.error('Failed to fetch data');
    }
  };

  const { data: portfolios, isSuccess } = useQuery<IPortfolioResponse>({
    queryKey: ['portfolio', _id, params.toString()],
    queryFn: fetchPortfolio,
    staleTime: 1000 * 60 * 10, // 10분
  });

  return (
    <>
      <Header title={isSuccess ? portfolios.studioName : ''} />
      <StudioNavigator _id={_id} />

      <ul css={filterBoxStyle}>
        <li>
          <Button
            text="전체"
            width="fit"
            size="small"
            variant="white"
            active={!params.size}
            onClick={() => changeParams('all')}
          />
        </li>
        {isSuccess &&
          portfolios.menuNameList.map((menu, idx) => (
            <li key={menu}>
              <Button
                text={menu}
                width="fit"
                size="small"
                variant="white"
                active={params.toString().includes(`${portfolios.menuIdList[idx]}`)}
                onClick={() => changeParams(portfolios.menuIdList[idx])}
              />
            </li>
          ))}
      </ul>

      <div css={listStyle}>
        {isSuccess ? (
          portfolios.portfolioDtos.content.length ? (
            <MasonryList>
              {portfolios.portfolioDtos.content.map(({ url, studio, id }) => (
                <div key={`${studio}-${id}`} onClick={() => handleClick(id)}>
                  <img src={url} alt={`${studio}-${id}`} />
                </div>
              ))}
            </MasonryList>
          ) : (
            <EmptyMessage message="포트폴리오가 없습니다." />
          )
        ) : (
          <EmptyMessage message="문제가 발생했습니다. 잠시 후 다시 시도해주세요." />
        )}
      </div>

      {
        <DimmedModal>
          {isSuccess && (
            <PortfolioSwiper
              data={portfolios.portfolioDtos.content}
              studioName={portfolios.studioName}
            />
          )}
        </DimmedModal>
      }
    </>
  );
};

export default StudioPortfolio;

const filterBoxStyle = css`
  display: flex;
  gap: 0.6rem;
  margin: 1.2rem 0;
`;

const listStyle = css`
  min-height: 50vh;
`;
