/** @jsxImportSource @emotion/react */
import BackButton from '@components/BackButton/BackButton';
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoTitleXsSb } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';

interface HeaderProps {
  title?: string;
  backTo?: string;
  fixed?: boolean;
  scrollEvent?: boolean;
}

const Header = ({ title, backTo, fixed = false, scrollEvent = false }: HeaderProps) => {
  const [scrollY, setScrollY] = useState(false);

  useEffect(() => {
    if (!scrollEvent) return;

    const handleScroll = () => setScrollY(window.scrollY >= 250);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollEvent]);

  return (
    <header css={[headerStyle(fixed, scrollY, scrollEvent)]} className="mo">
      <BackButton to={backTo} />
      {title && <h1 css={[TypoTitleXsSb, additionalH1Style]}>{title}</h1>}
    </header>
  );
};

export default Header;

const headerStyle = (fix: boolean, scrollY: boolean, scrollEvent: boolean) => css`
  display: flex;
  width: 100%;
  align-items: center;
  background-color: ${fix && scrollEvent
    ? scrollY
      ? variables.colors.white
      : 'transparent'
    : variables.colors.white};
  ${fix &&
  `position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  `}
  padding: ${variables.layoutPadding};
  transition: all 0.2s;

  ${mqMin(breakPoints.pc)} {
    display: none;
  }
`;

const additionalH1Style = css`
  margin-left: calc(50% - 2.4rem);
  transform: translateX(-50%);
`;
