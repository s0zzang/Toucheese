/** @jsxImportSource @emotion/react */

import Button from '@components/Button/Button';
import Header from '@components/Header/Header';
import MasonryList from '@components/Masonry/Masonry';
import EmptyMessage from '@components/Message/EmptyMessage';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import { useDimSwiperStore } from '@store/useDimSwiper';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPortfolio } from 'types/types';
import DimmedModal from '../components/DimmedModal';
import PortfolioSwiper from './PortfolioSwiper';

const StudioPortfolio = () => {
  const { _id } = useParams() as { _id: string };
  const { open } = useModal(1);

  const [data, setData] = useState<IPortfolio[]>([]);
  const [studioName, setStudioName] = useState('');
  const [menuNames, setMenuNames] = useState<string[]>();

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
      const data = await response.json();
      setData(data.portfolioDtos.content);
      setMenuNames(data.menuNameList);
      setStudioName(data.studioName);
    } catch (err) {
      console.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <>
      <Header title={studioName} />
      <StudioNavigator _id={_id} />

      <FilterBoxStyle>
        <li>
          <Button text="전체" width="fit" size="small" variant="white" />
        </li>
        {menuNames &&
          menuNames.map((menu) => (
            <li key={menu}>
              <Button text={menu} width="fit" size="small" variant="white" />
            </li>
          ))}
      </FilterBoxStyle>

      <ListStyle>
        {data.length ? (
          <MasonryList>
            {data.map(({ url, studio, id }) => (
              <div key={`${studio}-${id}`} onClick={() => handleClick(id)}>
                <img src={url} alt={`${studio}-${id}`} />
              </div>
            ))}
          </MasonryList>
        ) : (
          <EmptyMessage message="포트폴리오가 없습니다." />
        )}
      </ListStyle>

      <DimmedModal>
        <PortfolioSwiper data={data} studioName={studioName} />
      </DimmedModal>
    </>
  );
};

export default StudioPortfolio;

const FilterBoxStyle = styled.ul`
  display: flex;
  gap: 0.6rem;
  margin: 1.2rem 0;
`;

const ListStyle = styled.div`
  min-height: 50vh;
`;
