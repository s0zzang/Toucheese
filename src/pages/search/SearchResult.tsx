/** @jsxImportSource @emotion/react */
import { useNavigate, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import SearchBar from '@pages/search/components/SearchBar';
import BackButton from './components/BackButton';
import StudioList from '@components/Studio/StudioList';
import { useState } from 'react';

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearching, setIsSearching] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('keyword') || '';

  const handleSearch = (term: string) => {
    navigate(`/search/results?keyword=${encodeURIComponent(term)}`, { replace: true });
    setIsSearching(true);
  };

  return (
    <div>
      <div css={searchHeaderStyle}>
        <BackButton to="/search" replace ariaLabel="검색 페이지로 돌아가기" />
        <SearchBar onSearch={handleSearch} />
      </div>

      {isSearching ? <p>검색 중...</p> : searchTerm ? <StudioList mode="search/result" searchParams={new URLSearchParams({ keyword: searchTerm })} /> : <p>스튜디오 검색 결과가 없습니다.</p>}
    </div>
  );
};

export default SearchResults;

const searchHeaderStyle = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.6rem;
`;
