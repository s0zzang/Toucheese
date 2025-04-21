/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodyMdM, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { useState } from 'react';

type Theme = '전체' | '몽환' | '내추럴' | '러블리' | '시크' | '청순' | '상큼';

const BookmarkNavigator = () => {
  const [activeTheme, setActiveTheme] = useState<Theme>('전체');
  const themes: Theme[] = ['전체', '몽환', '내추럴', '러블리', '시크', '청순', '상큼'];

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <ul
        css={css`
          width: 100%;
          display: flex;
          box-shadow: inset 0 -0.1rem ${variables.colors.gray300};

          ${mqMin(breakPoints.pc)} {
            width: 47.8rem;
          }
        `}
      >
        {themes.map((theme) => (
          <li
            key={theme}
            css={css`
              flex-shrink: 0;
              flex-grow: 1;

              ${mqMin(breakPoints.pc)} {
              }
            `}
          >
            <button
              type="button"
              className={theme === activeTheme ? 'isActive' : ''}
              onClick={() => setActiveTheme(theme)}
              css={buttonStyle}
            >
              <span>{theme}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarkNavigator;

const buttonStyle = css`
  width: 100%;
  padding: 1.2rem 0;
  cursor: pointer;
  ${TypoBodyMdM}
  color: ${variables.colors.gray600};

  display: flex;
  justify-content: center;
  align-items: center;

  &.isActive {
    color: ${variables.colors.black};
    box-shadow: inset 0 -0.2rem ${variables.colors.black};
  }

  & > span {
    display: inline-block;
    position: relative;
  }

  &.isActive > span::after {
    content: '';
    position: absolute;
    right: -0.55rem;
    top: 0rem;
    width: 0.6rem;
    height: 0.6rem;
    background: url('/img/icon-nav-badge.svg') no-repeat center / contain;
  }

  ${mqMin(breakPoints.pc)} {
    padding: 0.9rem 1.4rem;
    box-sizing: border-box;
    ${TypoTitleXsM}
  }
`;
