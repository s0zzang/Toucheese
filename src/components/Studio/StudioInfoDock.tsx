/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import variables from '@styles/Variables';
import { useParams } from 'react-router-dom';
import StudioInfo from './StudioInfo';
import { IStudioDetail } from 'types/types';

const StudioInfoDock = () => {
  const { _id } = useParams();
  const studioData = sessionStorage.getItem('studio-storage');
  const parsedData = studioData ? JSON.parse(studioData) : null;
  const data: IStudioDetail = parsedData?.state.studioDetail[Number(_id)];

  return (
    <aside
      className="pc"
      css={css`
        ${mqMin(breakPoints.pc)} {
          width: 100%;
          margin-right: calc(${variables.layoutPadding});
          background-color: ${variables.colors.white};
        }
      `}
    >
      {data && <StudioInfo data={data} id={_id} />}
    </aside>
  );
};

export default StudioInfoDock;
