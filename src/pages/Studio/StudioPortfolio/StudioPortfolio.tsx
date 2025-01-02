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
import { useParams } from 'react-router-dom';
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
  const { open } = useModal(1);

  const setSelectedId = useDimSwiperStore((state) => state.setSelectedId);

  const handleClick = (clickedId: number) => {
    setSelectedId(clickedId);
    open();
  };

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/${_id}/portfolio`, {
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

  const { data, isSuccess } = useQuery<IPortfolioResponse>({
    queryKey: ['portfolio', _id],
    queryFn: fetchPortfolio,
    staleTime: 1000 * 60 * 10, // 10분
  });

  return (
    <>
      <Header title={isSuccess ? data.studioName : ''} />
      <StudioNavigator _id={_id} />

      <ul css={FilterBoxStyle}>
        <li>
          <Button text="전체" width="fit" size="small" variant="white" />
        </li>
        {isSuccess &&
          data.menuNameList.map((menu) => (
            <li key={menu}>
              <Button text={menu} width="fit" size="small" variant="white" />
            </li>
          ))}
      </ul>

      <div css={ListStyle}>
        {isSuccess ? (
          data.portfolioDtos.content.length ? (
            <MasonryList>
              {data.portfolioDtos.content.map(({ url, studio, id }) => (
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

      {<DimmedModal>{isSuccess && <PortfolioSwiper data={data.portfolioDtos.content} studioName={data.studioName} />}</DimmedModal>}
    </>
  );
};

export default StudioPortfolio;

const FilterBoxStyle = css`
  display: flex;
  gap: 0.6rem;
  margin: 1.2rem 0;
`;

const ListStyle = css`
  min-height: 50vh;
`;
