import { css } from '@emotion/react';
import variables from './Variables';

// title
export const TypoTitleXsR = css`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
`;
export const TypoTitleXsM = css`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.4rem;
`;
export const TypoTitleXsB = css`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.4rem;
`;
export const TypoTitleSmS = css`
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 2.4rem;
`;

export const TypoBodyMdR = css`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
`;
export const TypoBodyMdM = css`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
`;

export const TypoCapSmR = css`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.4rem;
`;
export const TypoCapSmM = css`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.4rem;
`;

export const DividerStyle = css`
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: calc(100% + 4rem);
    height: 1rem;
    background-color: ${variables.colors.gray300};
    transform: translateX(-50%);
  }
`;
// 웹 접근성
export const Hidden = css`
  position: absolute !important;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
`;
