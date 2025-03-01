/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { breakPoints } from '@styles/BreakPoint';
import { TypoBodyMdM } from '@styles/Common';
import variables from '@styles/Variables';

const NoPic = () => {
  return (
    <DivStyle>
      <p css={TypoBodyMdM}>
        멋진 사진을 준비 중입니다.
        <br />
        기대해 주세요!
      </p>
    </DivStyle>
  );
};

const DivStyle = styled.div`
  width: 100%;
  height: 11.8rem;
  padding: 0 2.141rem 0 ${variables.layoutPadding};
  background-color: ${variables.colors.gray200};
  display: flex;
  overflow: hidden;

  & p {
    flex-grow: 1;
    flex-shrink: 0;
    color: ${variables.colors.gray700};
    margin: auto 0;
  }

  &::after {
    content: '';
    width: 9.752rem;
    height: 9.494rem;
    background: url('/img/icon-nopic-mo.svg') no-repeat center / contain;
    margin-top: auto;
    margin-bottom: -0.255rem;
  }

  @media (min-width: ${breakPoints.pc}) {
    height: 17.1rem;
  }
`;

export default NoPic;
