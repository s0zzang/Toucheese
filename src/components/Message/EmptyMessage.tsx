/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TypoBodyMdM } from '@styles/Common';

const EmptyMessage = ({ message }: { message: string }) => {
  return (
    <div css={containerStyle}>
      <p css={[emptyMessageStyle, TypoBodyMdM]}>{message}</p>
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
