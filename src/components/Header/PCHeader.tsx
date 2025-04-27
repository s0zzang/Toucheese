/** @jsxImportSource @emotion/react */
import SearchBar from '@components/Search/SearchBar';
import UserButton from '@components/UserButton/UserButton';
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { bg100vw, Hidden, PCLayout } from '@styles/Common';
import variables from '@styles/Variables';
import { Link } from 'react-router-dom';

const PCHeader = () => {
  return (
    <header className="pc" css={HeaderStyle}>
      <div css={HeaderContentsStyle}>
        <div css={logoContainerStyle}>
          <Link css={homeLogoStyle} to="/">
            <span css={Hidden}>홈으로</span>
            <img src="/img/logo-pc.svg" alt="터치즈 홈" />
          </Link>
        </div>

        <div css={inputContainerStyle}>
          <div css={inputStyle}>
            <SearchBar />
          </div>
        </div>

        <div css={buttonContainerStyle}>
          <div css={userBtnStyle}>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default PCHeader;

const HeaderStyle = css`
  ${mqMin(breakPoints.pc)} {
    ${PCLayout}
    ${bg100vw(variables.colors.white)}
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: ${variables.colors.white};
    box-shadow: inset 0 -1px ${variables.colors.gray300};
    box-sizing: border-box;

    &::before {
      box-shadow: inset 0 -1px ${variables.colors.gray300};
    }
  }
`;

const HeaderContentsStyle = css`
  ${mqMin(breakPoints.pc)} {
    display: flex;
    gap: 3.2rem;
    align-items: center;
    padding: 1rem ${variables.layoutPadding};
  }
`;

const logoContainerStyle = css`
  width: 28rem;
  flex-shrink: 0;
`;

const homeLogoStyle = css`
  display: inline-block;
  padding: 1.2rem 0;
  box-sizing: border-box;

  & > img {
    width: 13.7rem;
    height: 3.6rem;
  }
`;

const inputContainerStyle = css`
  flex-grow: 1;
  max-width: 60.8rem;
  display: flex;
  align-items: center;
`;

const inputStyle = css`
  margin: 0.6rem auto;
  width: 100%;
`;

const buttonContainerStyle = css`
  margin-left: auto;
  flex-shrink: 0;
  display: flex;
`;

const userBtnStyle = css`
  margin-left: auto;
`;
