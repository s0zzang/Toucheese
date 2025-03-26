/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import variables from '@styles/Variables';
import { useParams } from 'react-router-dom';
import StudioInfo from './StudioInfo';

const StudioInfoDock = () => {
  const { _id } = useParams();
  const studioData = sessionStorage.getItem('studio-storage');
  const parsedData = studioData ? JSON.parse(studioData) : null;
  const data = parsedData?.state.studioDetail[Number(_id)];

  return (
    <aside
      className="pc"
      css={css`
        ${mqMin(breakPoints.pc)} {
          flex-shrink: 0;
          width: 37.6rem;
          background-color: ${variables.colors.white};
          box-shadow: inset 0.1rem 0 ${variables.colors.gray300};
          z-index: 9;
          padding: 5.8rem ${variables.layoutPadding};
        }
      `}
    >
      {data && <StudioInfo data={data} id={_id} />}
    </aside>
  );
};

export default StudioInfoDock;
