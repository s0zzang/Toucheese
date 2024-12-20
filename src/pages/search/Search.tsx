/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TrendingStudios from '@pages/search/components/TrendingStudios';
import RecentSearches from '@pages/search/components/RecentSearches';
import SearchBar from '@pages/search/components/SearchBar';
import BackButton from '@components/BackButton/BackButton';

const Search = () => {
  return (
    <div>
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
