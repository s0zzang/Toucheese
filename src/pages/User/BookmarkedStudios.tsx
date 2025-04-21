/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import BookmarkNavigator from '@components/Navigator/BookmarkNavigator';
import { css } from '@emotion/react';
import useGetBookmarkList from '@hooks/useGetBookmarkList';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { bg100vw, PCLayout, TypoTitleMdSb } from '@styles/Common';
import variables from '@styles/Variables';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export type Theme = '전체' | '몽환' | '내추럴' | '러블리' | '시크' | '청순' | '상큼';

const BookmarkedStudios = () => {
  const [activeTheme, setActiveTheme] = useState<Theme>('전체');
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });

  const { data } = useGetBookmarkList(activeTheme);

  console.log(data);

  // 선택한 테마의 탭 UI를 활성화하고, 북마크 목록을 갱신
  const handleTheme = (theme: Theme) => {
    setActiveTheme(theme);
  };

  return (
    <main
      css={css`
        ${mqMin(breakPoints.pc)} {
          ${PCLayout}
        }
      `}
    >
      <section css={headerStyle} className="bookmarked-header">
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
        <BookmarkNavigator theme={activeTheme} handleTheme={handleTheme} />
      </section>
      <section
        css={css`
          box-shadow: inset 0 0 10px red;
          margin-top: 10rem;
          padding: 1.8rem 0;

          ${mqMin(breakPoints.pc)} {
            margin-top: unset;
          }
        `}
      >
        {activeTheme} 스튜디오 목록
      </section>
    </main>
  );
};

export default BookmarkedStudios;

const headerStyle = css`
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
`;
