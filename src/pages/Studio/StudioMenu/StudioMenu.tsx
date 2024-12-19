/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import BackButton from '@components/BackButton/BackButton';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import StudioMenuItem from './StudioMenuItem';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IMenuListRes } from 'types/types';

const StudioMenu = () => {
  const { _id } = useParams();
  const [data, setData] = useState<IMenuListRes[]>();

  const fetchMeun = async () => {
    const res = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/${_id}/menu`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error('Failed to fetch data');
    }

    const data = await res.json();

    setData(data);
  };

  useEffect(() => {
    fetchMeun();
  }, []);

  const StudioMenuList = data?.map((item) => <StudioMenuItem key={item.id} StudioId={_id} data={item} />);
  return (
    <>
      <BackButton ariaLabel="스튜디오 이름" />
      <StudioNavigator _id={String(_id)} />
      <div css={ItemLIstStyle}>{StudioMenuList}</div>
    </>
  );
};

export default StudioMenu;

const ItemLIstStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 0.4rem;
`;
