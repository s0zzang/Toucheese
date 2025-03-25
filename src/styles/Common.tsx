import { css } from '@emotion/react';
import variables from './Variables';
import { breakPoints, mqMin } from './BreakPoint';

// title
export const TypoTitleXsR = css`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  ${mqMin(breakPoints.pc)} {
    font-size: 1.8rem;
    line-height: 2.6rem;
  }
`;

export const TypoTitleXsM = css`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.4rem;
  ${mqMin(breakPoints.pc)} {
    font-size: 1.8rem;
    line-height: 2.6rem;
  }
`;

export const TypoTitleXsSb = css`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.4rem;
  ${mqMin(breakPoints.pc)} {
    font-size: 1.8rem;
    line-height: 2.6rem;
  }
`;

export const TypoTitleXsB = css`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.4rem;
  ${mqMin(breakPoints.pc)} {
    font-size: 1.8rem;
    line-height: 2.6rem;
  }
`;

export const TypoTitleSmS = css`
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 2.4rem;
  ${mqMin(breakPoints.pc)} {
    font-size: 2rem;
    line-height: 2.6rem;
  }
`;

export const TypoTitleMdSb = css`
  font-size: 2.2rem;
  font-weight: 600;
  line-height: 2.8rem;
  ${mqMin(breakPoints.pc)} {
    font-size: 2.8rem;
    line-height: 3.4rem;
  }
`;

export const TypoBodySmSb = css`
  ${mqMin(breakPoints.pc)} {
    font-size: 1.4rem;
    line-height: 2rem;
    font-weight: 600;
  }
`;

export const TypoBodySmM = css`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.8rem;
  ${mqMin(breakPoints.pc)} {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`;

export const TypoBodySmR = css`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.8rem;
  ${mqMin(breakPoints.pc)} {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`;

export const TypoBodyMdR = css`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
  ${mqMin(breakPoints.pc)} {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
`;

export const TypoBodyMdSb = css`
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2rem;
  ${mqMin(breakPoints.pc)} {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
`;

export const TypoBodyMdM = css`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
  ${mqMin(breakPoints.pc)} {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
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
  ${mqMin(breakPoints.pc)} {
    font-size: 1.4rem;
    line-height: 1.6rem;
  }
`;

export const TypoCapXsM = css`
  ${mqMin(breakPoints.pc)} {
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.4rem;
  }
`;

export const TypoCapXsR = css`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.2rem;
`;

export const DividerStyle = css`
  position: relative;
  padding-bottom: calc(2rem + 1rem);
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: calc(100% + calc(${variables.layoutPadding} * 2));
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

// layout
export const PCLayout = css`
  max-width: ${variables.maxWidth};
  margin-left: auto;
  margin-right: auto;
`;

// 화면 가득 차는 배경
export const bg100vw = (bg: string) => css`
  position: relative;
  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100vw;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: ${bg};
    z-index: -1;
  }
`;
