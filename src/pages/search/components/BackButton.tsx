/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

interface BackButtonProps {
  to?: string;
  replace?: boolean;
  ariaLabel?: string;
}

const BackButton = ({ to = '/search', replace = true, ariaLabel = '뒤로가기' }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(to, { replace });
  };

  return (
    <button onClick={handleGoBack} css={buttonStyle} aria-label={ariaLabel}>
      <img src="/img/icon-arrowback.svg" alt="뒤로가기" />
    </button>
  );
};

export default BackButton;

const buttonStyle = css`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
