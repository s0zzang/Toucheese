/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';

const TrendingStudios: React.FC = () => {
  // 예제 데이터
  const trending = ['동화사진', '신라 사진', '산호맨손', '찰각', '인생사진', '해피포토', '터치즈', '인생사진', '포토이즘', '그림달'];

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
        {renderStudios(trending.slice(0, 5), 1)}
        {renderStudios(trending.slice(5), 6)}
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
