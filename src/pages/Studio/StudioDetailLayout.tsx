/** @jsxImportSource @emotion/react */
import Loading from '@components/Loading/Loading';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import StudioInfoDock from '@components/Studio/StudioInfoDock';
import { css } from '@emotion/react';
import { useGetStudioDetail } from '@hooks/useGetStudioDetail';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { bg100vw, PCLayout } from '@styles/Common';
import variables from '@styles/Variables';
import { useMediaQuery } from 'react-responsive';
import { Outlet, useParams } from 'react-router-dom';

const StudioDetailLayout = () => {
  const { _id } = useParams() as { _id: string };
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });
  const { data } = useGetStudioDetail(_id);

  return (
    <>
      {data ? (
        <main
          css={css`
            ${mqMin(breakPoints.pc)} {
              ${PCLayout}
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
            {isPc && (
              <div css={navStyle}>
                <StudioNavigator _id={_id} type="pcOnly" />
              </div>
            )}
            <div
              css={css`
                ${mqMin(breakPoints.pc)} {
                  padding-top: 5.8rem;
                }
              `}
            >
              <Outlet context={data} />
            </div>
          </section>

          {/* PC용 */}
          <aside css={dockStyle}>
            <StudioInfoDock data={data} />
          </aside>
        </main>
      ) : (
        <Loading size="small" phrase="스튜디오 정보를 불러오고 있습니다." />
      )}
    </>
  );
};

export default StudioDetailLayout;

const navStyle = css`
  ${PCLayout}
  ${bg100vw(variables.colors.white)}
background-color: ${variables.colors.white};
  position: fixed;
  top: 8rem;
  left: 0;
  right: 0;
  z-index: 9;
  padding-left: ${variables.layoutPadding};
  box-shadow: inset 0 -1px ${variables.colors.gray300};

  ::before {
    left: 0;
    transform: translateX(-100%);
    box-shadow: inset 0 -1px ${variables.colors.gray300};
  }
`;

const dockStyle = css`
  ${mqMin(breakPoints.pc)} {
    flex-shrink: 0;
    position: sticky;
    top: 8rem;
    right: 0;
    width: 42.4rem;
    height: calc(100vh - 8rem);
    z-index: 9;
    padding-top: 5.8rem;
    padding-left: ${variables.layoutPadding};
    margin-right: calc(-1 * ${variables.layoutPadding});
    margin-bottom: -3rem;
    background-color: ${variables.colors.white};
    box-shadow: inset 1px 0 ${variables.colors.gray300};
    box-sizing: border-box;
  }
`;
