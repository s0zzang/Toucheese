/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import StudioInfo from './StudioInfo';
import { css } from '@emotion/react';

const StudioInfoDock = () => {
  const { _id } = useParams();
  const studioData = sessionStorage.getItem('studio-storage');
  const parsedData = studioData ? JSON.parse(studioData) : null;
  const data = parsedData?.state.studioDetail[Number(_id)];

  return (
    <aside className="pc" css={css``}>
      {data && <StudioInfo data={data} id={_id} />}
    </aside>
  );
};

export default StudioInfoDock;
