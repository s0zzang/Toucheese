import Button from '@components/Button/Button';
import Header from '@components/Header/Header';
import MasonryList from '@components/Masonry/Masonry';
import EmptyMessage from '@components/Message/EmptyMessage';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPortfolio } from 'types/types';

const StudioPortfolio = () => {
  const [data, setData] = useState<IPortfolio[]>([]);
  const [studioName, setStudioName] = useState('');
  const { _id } = useParams() as { _id: string };
  const handleClick = () => {
    console.log('click');
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
      setData(data.content);
    } catch (err) {
      console.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchPortfolio();
    if (data.length) setStudioName(data[0].studio);
  }, []);

  return (
    <>
      <Header title={studioName} backTo="/home" />
      <StudioNavigator _id={_id} />

      <FilterBoxStyle>
        <li>
          <Button text="전체" width="fit" size="small" variant="white" />
        </li>
      </FilterBoxStyle>

      <ListStyle>
        {data && data.length ? (
          <MasonryList>
            {data.map(({ url, studio, id }) => (
              <div key={`${studio}-${id}`} onClick={handleClick}>
                <img src={url} alt={`${studio}-${id}`} />
              </div>
            ))}
          </MasonryList>
        ) : (
          <EmptyMessage message="포트폴리오가 없습니다." />
        )}
      </ListStyle>
    </>
  );
};

export default StudioPortfolio;

const FilterBoxStyle = styled.ul`
  display: flex;
  margin: 1.2rem 0;
`;

const ListStyle = styled.div`
  min-height: 50vh;
`;
