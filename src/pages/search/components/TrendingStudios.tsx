/** @jsxImportSource @emotion/react */
import EmptyMessage from '@components/Message/EmptyMessage';
import { css } from '@emotion/react';
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
    <ul css={ulStyle}>
      {studios.map((studio, index) => (
        <li key={index} css={liStyle}>
          <span css={indexStyle}>{startIndex + index}</span>
          <span css={studioNameStyle}>{studio}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div css={wrapperStyle}>
      <h3 css={titleStyle}>관심 급상승 사진관</h3>
      <div css={containerStyle}>
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
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1.6rem;
`;

const containerStyle = css`
  display: flex;
  justify-content: space-between;
`;

const ulStyle = css`
  flex: 1;
`;

const liStyle = css`
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  font-weight: 400;
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
`;
