/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface EmptyMessageProps {
  message: string;
}

const EmptyMessage = ({ message }: EmptyMessageProps) => {
  return (
    <div css={containerStyle}>
      <p css={emptyMessageStyle}>{message}</p>
    </div>
  );
};

export default EmptyMessage;

const containerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
`;

const emptyMessageStyle = css`
  font-size: 1.4rem;
`;
