/** @jsxImportSource @emotion/react */
import BackButton from '@components/BackButton/BackButton';
import { css, SerializedStyles } from '@emotion/react';
import { TypoTitleXsM } from '@styles/Common';

interface HeaderProps {
  title?: string;
  backTo?: string;
  customStyle?: SerializedStyles;
}

const Header = ({ title, backTo, customStyle }: HeaderProps) => {
  return (
    <header css={[headerStyle, customStyle]}>
      <BackButton to={backTo} />
      {title && <h1 css={[TypoTitleXsM, additionalH1Style]}>{title}</h1>}
    </header>
  );
};

export default Header;

const headerStyle = css`
  display: flex;
  align-items: center;
  padding-bottom: 1.4rem;
`;

const additionalH1Style = css`
  margin-left: calc(50% - 2.4rem);
  transform: translateX(-50%);
`;
