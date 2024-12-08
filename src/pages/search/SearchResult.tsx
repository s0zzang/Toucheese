/** @jsxImportSource @emotion/react */
import { useNavigate, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import SearchBar from '@pages/search/components/SearchBar';
import BackButton from './components/BackButton';
import StudioList from '@components/Studio/StudioList';
import { useEffect, useState } from 'react';

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('keyword') || '';

  const handleSearch = (term: string) => {
    navigate(`/search/results?keyword=${encodeURIComponent(term)}`, { replace: true });
  };

  return (
    <div>
      <div css={searchHeaderStyle}>
        <BackButton to="/search" replace ariaLabel="검색 페이지로 돌아가기" />
        <SearchBar onSearch={handleSearch} />
      </div>

      <StudioList mode="search/result" searchParams={new URLSearchParams({ keyword: searchTerm })} />
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
