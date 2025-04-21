/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import BookmarkNavigator from '@components/Navigator/BookmarkNavigator';
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { bg100vw, PCLayout, TypoTitleMdSb } from '@styles/Common';
import variables from '@styles/Variables';
import { useMediaQuery } from 'react-responsive';

const BookmarkedStudios = () => {
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });

  return (
    <main
      css={css`
        ${mqMin(breakPoints.pc)} {
          ${PCLayout}
        }
      `}
    >
      <section
        css={css`
          background-color: white;
          padding-top: 5.6rem;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;

          ${mqMin(breakPoints.pc)} {
            padding-top: unset;
            ${bg100vw(variables.colors.white)}
            box-shadow: inset 0 -0.1rem ${variables.colors.gray300};

            &::before {
              box-shadow: inset 0 -0.1rem ${variables.colors.gray300};
            }
          }
        `}
        className="bookmarked-header"
      >
        <Header title="찜한 사진관" backTo="/user/mypage" fixed={true} />
        {isPc && (
          <h1
            css={css`
              padding: 4rem 0 2rem;
              ${TypoTitleMdSb}
            `}
          >
            찜한 내역
          </h1>
        )}
        <BookmarkNavigator />
      </section>
      <section
        css={css`
          /* box-shadow: inset 0 0 10px black; */
          margin-top: 10rem;
          padding: 1.8rem 0;

          ${mqMin(breakPoints.pc)} {
            margin-top: unset;
          }
        `}
      >
        스튜디오 목록
      </section>
    </main>
  );
};

export default BookmarkedStudios;
