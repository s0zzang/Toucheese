/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import BookmarkNavigator from '@components/Navigator/BookmarkNavigator';
import { css } from '@emotion/react';
import useGetBookmarkList from '@hooks/useGetBookmarkList';
import useToast from '@hooks/useToast';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { bg100vw, Hidden, PCLayout, TypoTitleMdSb } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import BookmarkedStudioList from './components/BookmarkedStudioList';
import { Helmet } from 'react-helmet-async';

export type Theme = '전체' | '몽환' | '내추럴' | '러블리' | '시크' | '청순' | '상큼';

const BookmarkedStudios = () => {
  const [activeTheme, setActiveTheme] = useState<Theme>('전체');
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });
  const openToast = useToast();
  const navigate = useNavigate();

  const { data, error, refetch } = useGetBookmarkList(activeTheme);

  useEffect(() => {
    if (error) {
      if (error.message === '403') {
        openToast('로그인 세션이 만료되었습니다. 다시 로그인 해주세요!');
        navigate('/user/auth');
      } else {
        throw new Error(error.message);
      }
    }
  }, [error]);

  // 선택한 테마의 탭 UI를 활성화하고, 북마크 목록을 갱신
  const handleTheme = (theme: Theme) => {
    setActiveTheme(theme);
  };

  return (
    <>
      <Helmet>
        <title>찜한 사진관 {activeTheme === '전체' ? '| 터치즈' : `- ${activeTheme}`}</title>
        <meta
          property="og:title"
          content={`찜한 사진관 ${activeTheme === '전체' ? '| 터치즈' : `- ${activeTheme}`}`}
        />
      </Helmet>
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
            margin-top: 10rem;
            padding-bottom: 3rem;

            ${mqMin(breakPoints.pc)} {
              margin-top: 13.85rem;
            }
          `}
        >
          <h2 css={Hidden}>총 {data ? data.length : 0}건</h2>
          {data && <BookmarkedStudioList data={data} handleUnbookmark={refetch} />}
        </section>
      </main>
    </>
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
    ${PCLayout}
    ${bg100vw(variables.colors.white)}
    padding: 0 ${variables.layoutPadding};
    box-shadow: inset 0 -1px ${variables.colors.gray300};
    position: fixed;
    top: 8rem;
    z-index: 9;

    &::before {
      box-shadow: inset 0 -1px ${variables.colors.gray300};
    }
  }
`;
