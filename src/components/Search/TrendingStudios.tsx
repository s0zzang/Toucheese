/** @jsxImportSource @emotion/react */
import EmptyMessage from '@components/Message/EmptyMessage';
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodyMdM, TypoBodyMdSb, TypoTitleXsB } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';

const TrendingStudios = () => {
  const [trending, setTrending] = useState<string[]>([]);

  useEffect(() => {
    const fetchTrendingStudios = async () => {
      const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/search`);
      const data = await response.json();
      setTrending(data);
    };

    fetchTrendingStudios();
  }, []);

  const renderStudios = (studios: string[], startIndex: number) => (
    <ul>
      {studios.map((studio, index) => (
        <li key={index} css={liStyle}>
          <span css={[indexStyle, TypoBodyMdSb]}>{startIndex + index}</span>
          <span css={[studioNameStyle, TypoBodyMdM]}>{studio}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div css={wrapperStyle}>
      <h3 css={[TypoTitleXsB, titleStyle]}>관심 급상승 사진관</h3>
      <div css={[containerStyle]}>
        {trending.length > 0 ? (
          <>
            {renderStudios(trending.slice(0, 5), 1)}
            {renderStudios(trending.slice(5), 6)}
          </>
        ) : (
          <EmptyMessage message="관심 급상승 사진관이 없습니다." />
        )}
      </div>
    </div>
  );
};

export default TrendingStudios;

const wrapperStyle = css`
  margin-top: 2rem;
`;

const titleStyle = css`
  margin-bottom: 1.6rem;
`;

const containerStyle = css`
  display: flex;
  flex: 1;
  justify-content: space-between;

  ${mqMin(breakPoints.pc)} {
    justify-content: flex-start;
    gap: 6rem;
  }
`;

const liStyle = css`
  margin-bottom: 2.4rem;
  display: flex;
  align-items: center;
`;

const indexStyle = css`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${variables.colors.primary800};
  text-align: right;
`;

const studioNameStyle = css`
  margin-left: 1.6rem;
  color: ${variables.colors.gray900};
`;
