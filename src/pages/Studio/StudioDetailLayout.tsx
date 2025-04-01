/** @jsxImportSource @emotion/react */
import StudioInfoDock from '@components/Studio/StudioInfoDock';
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { Outlet } from 'react-router-dom';

const StudioDetailLayout = () => {
  return (
    <main
      css={css`
        ${mqMin(breakPoints.pc)} {
          display: flex;
          gap: 1.6rem;
        }
      `}
    >
      <section
        css={css`
          ${mqMin(breakPoints.pc)} {
            flex-grow: 1;
          }
        `}
      >
        <Outlet />
      </section>

      {/* PC용 */}
      <StudioInfoDock />
    </main>
  );
};

export default StudioDetailLayout;
