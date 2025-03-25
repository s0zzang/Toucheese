/** @jsxImportSource @emotion/react */

import SearchBar from '@components/Search/SearchBar';
import UserButton from '@components/UserButton/UserButton';
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { Hidden, PCLayout } from '@styles/Common';
import variables from '@styles/Variables';
import { Link } from 'react-router-dom';

const PCHeader = () => {
  return (
    <header className="pc" css={HeaderStyle}>
      <div css={HeaderContentsStyle}>
        <Link css={homeLogoStyle} to="/">
          <span css={Hidden}>홈으로</span>
          <img src="/img/logo-pc.svg" alt="터치즈 홈" />
        </Link>

        <div css={inputContainerStyle}>
          <div css={inputStyle}>
            <SearchBar />
          </div>
        </div>
        <div css={userBtnStyle}>
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default PCHeader;

const HeaderStyle = css`
  ${mqMin(breakPoints.pc)} {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: ${variables.colors.white};
    box-shadow: inset 0 -0.1rem ${variables.colors.gray300};
    box-sizing: border-box;
  }
`;

const HeaderContentsStyle = css`
  ${mqMin(breakPoints.pc)} {
    ${PCLayout}

    display: flex;
    align-items: center;
    padding: 1rem ${variables.layoutPadding};
  }
`;

const homeLogoStyle = css`
  margin: 1.2rem 0;
  flex-shrink: 0;

  & > img {
    width: 13.7rem;
    height: 3.6rem;
  }
`;

const inputContainerStyle = css`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const inputStyle = css`
  margin: 0.6rem auto;
  position: relative;
  width: 60rem;
`;

const userBtnStyle = css`
  flex-shrink: 0;
  margin-left: auto;
`;
