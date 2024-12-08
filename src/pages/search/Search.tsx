/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import TrendingStudios from '@pages/search/components/TrendingStudios';
import RecentSearches from '@pages/search/components/RecentSearches';
import SearchBar from '@pages/search/components/SearchBar';
import BackButton from './components/BackButton';

const Search = () => {
  const navigate = useNavigate();

  const handleSearch = (term: string) => {
    navigate(`/search/results?keyword=${encodeURIComponent(term)}`);
  };

  return (
    <div>
      <div css={searchHeaderStyle}>
        <BackButton to="/" replace={true} ariaLabel="메인화면으로 돌아가기" />
        <SearchBar onSearch={handleSearch} />
      </div>
      <RecentSearches onSearch={handleSearch} />
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
