/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

interface BackButtonProps {
  to?: string;
  replace?: boolean;
  ariaLabel?: string;
}

const BackButton = ({ to, replace = true, ariaLabel = '뒤로가기' }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (to) {
      navigate(to, { replace }); // 특정 경로로 이동
    } else {
      navigate(-1); // 이전 페이지로 이동
    }
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
