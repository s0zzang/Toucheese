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
      if (window.history.length > 1) {
        navigate(-1); // 이전 스택으로 이동
      } else {
        navigate('/'); // 이전 스택이 없으면 기본 경로로 이동
      }
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
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;

  & img {
    width: 1.1rem;
    height: 1.9rem;
  }
`;
