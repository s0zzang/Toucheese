/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TrendingStudios from '@pages/search/components/TrendingStudios';
import RecentSearches from '@pages/search/components/RecentSearches';
import SearchBar from '@pages/search/components/SearchBar';
import BackButton from '@components/BackButton/BackButton';
import { Helmet } from 'react-helmet-async';

const Search = () => {
  return (
    <div>
      <Helmet>
        <title>스튜디오 검색</title>
        <meta property="og:title" content="스튜디오 검색" />
        <meta
          property="og:description"
          content="최근 인기 스튜디오를 확인하고 원하는 스튜디오를 검색해보세요."
        />
        <meta property="og:url" content={`${window.location.href}`} />
      </Helmet>
      <div css={searchHeaderStyle}>
        <BackButton to="/" replace={true} ariaLabel="메인화면으로 돌아가기" />
        <SearchBar />
      </div>
      <RecentSearches />
      <TrendingStudios />
    </div>
  );
};

export default Search;

const searchHeaderStyle = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.6rem;
`;
