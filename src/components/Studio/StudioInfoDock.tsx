/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import variables from '@styles/Variables';
import { useParams } from 'react-router-dom';
import StudioInfo from './StudioInfo';
import { IStudioDetail } from 'types/types';

const StudioInfoDock = ({ data }: { data: IStudioDetail }) => {
  const { _id } = useParams();

  return (
    <div
      className="pc"
      css={css`
        ${mqMin(breakPoints.pc)} {
          width: 100%;
          margin-right: calc(${variables.layoutPadding});
          background-color: ${variables.colors.white};
        }
      `}
    >
      <StudioInfo data={data} id={_id} />
    </div>
  );
};

export default StudioInfoDock;
