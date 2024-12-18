/** @jsxImportSource @emotion/react */
import BackButton from '@components/BackButton/BackButton';
import { css } from '@emotion/react';
import { TypoTitleXsM } from '@styles/Common';

interface HeaderProps {
  title?: string;
  backTo?: string;
}

const Header = ({ title, backTo }: HeaderProps) => {
  return (
    <header css={headerStyle}>
      <BackButton to={backTo} />
      <h1 css={[TypoTitleXsM, additionalStyle]}>{title}</h1>
    </header>
  );
};

export default Header;

const headerStyle = css`
  display: flex;
  align-items: center;
  padding-bottom: 1.4rem;
`;

const additionalStyle = css`
  margin-left: 1rem;
`;
