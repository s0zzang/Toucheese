/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodySmR, TypoCapSmM, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';

const NoPic = ({ type }: { type: number }) => {
  return (
    <div css={DivStyle(type)}>
      {type > 2 ? (
        <p>
          멋진 사진을 준비 중입니다.
          <br />
          기대해 주세요!
        </p>
      ) : (
        <p>
          멋진 사진을
          <br />
          기대해 주세요!
        </p>
      )}
    </div>
  );
};

const DivStyle = (type: number) => css`
  ${TypoCapSmM}
  background-color: ${variables.colors.gray200};
  color: ${variables.colors.gray600};
  padding: 0 ${variables.layoutPadding};
  width: 100%;
  height: 11.8rem;
  display: flex;
  align-items: center;

  p {
    word-break: break-all;
  }

  ${mqMin(breakPoints.pc)} {
    ${TypoTitleXsM}
    height: unset;

    ${type === 7 && `width: 100%; height: 16rem;`}
    ${type === 6 && `width: calc(((100% - 12px) / 7) * 6 + 10px); aspect-ratio: 772 / 160;`}
    ${type === 5 && `width: calc(((100% - 12px) / 7) * 5 + 8px); aspect-ratio: 643 / 160;`}
    ${type === 4 &&
    `width: calc(((100% - 12px) / 7) * 4 + 6px); aspect-ratio: 514 / 160; box-shadow: inset 0 0 10px red;`}
    ${type === 3 && `width: calc(((100% - 12px) / 7) * 3 + 4px); aspect-ratio: 385 / 160;`}
    ${type === 2 &&
    `width: calc(((100% - 12px) / 7) * 2 + 2px); aspect-ratio: 256 / 160; position: relative;`}
    ${type === 1 &&
    `width: calc(((100% - 12px) / 7) * 1); aspect-ratio: 127 / 160; flex-direction: column; gap: 1rem; justify-content: center; text-align: center; padding: 0 0.8rem;`}
    ${type === 1 && TypoBodySmR}

    p {
      ${type === 2 &&
      `position: absolute; top: 3.2rem; left: ${variables.layoutPadding}; z-index: 1;`}
    }

    &::after {
      content: '';
      margin-left: auto;
      margin-right: 2.6rem;

      ${(type === 6 || type === 7) &&
      `background: url('/img/icon-nopic-6.svg') no-repeat center / contain; 
        width: 46.434rem;
        height: 14.478rem;
      `}

      ${type === 5 &&
      `background: url('/img/icon-nopic-5.svg') no-repeat center / contain;
        width: 31.708rem;
        height: 14.478rem;
      `}

      ${(type === 4 || type === 3) &&
      `background: url('/img/icon-nopic-2.svg') no-repeat center / contain;
        width: 23.181rem;
        height: 14.478rem;
      `}

      ${type === 3 && `margin-right: -0.4rem;`}

      ${type === 2 &&
      `background: url('/img/icon-nopic-2.svg') no-repeat center / contain;
        width: 16.242rem;
        height: 10.144rem;
        margin: unset;
        position: absolute;
        bottom: 1.4rem;
        right: 1.3rem;
      `}

      ${type === 1 &&
      `background: url('/img/icon-nopic-1.svg') no-repeat center / contain;
        width: 6.37rem;
        height: 4.679rem;
        margin: 0 auto;
      `}
    }
  }
`;

export default NoPic;
