/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import SearchBar from '@pages/search/components/SearchBar';
import StudioList from '@pages/search/components/StudioList';
import BackButton from './components/BackButton';

//임시 데이터
const mockResults = [
  {
    id: 1,
    name: '스튜디오 몽환',
    description: '몽환적인 분위기의 촬영 공간',
    images: [
      'https://via.placeholder.com/600x400?text=몽환+Image+1',
      'https://via.placeholder.com/600x400?text=몽환+Image+2',
      'https://via.placeholder.com/600x400?text=몽환+Image+3',
      'https://via.placeholder.com/600x400?text=산호+Image+1',
      'https://via.placeholder.com/600x400?text=몽환+Image+3',
    ],
  },
  {
    id: 2,
    name: '산호 스튜디오',
    description: '밝고 따뜻한 느낌의 인테리어',
    images: [
      'https://via.placeholder.com/600x400?text=산호+Image+1',
      'https://via.placeholder.com/600x400?text=산호+Image+2',
      'https://via.placeholder.com/600x400?text=산호+Image+3',
      'https://via.placeholder.com/600x400?text=산호+Image+1',
      'https://via.placeholder.com/600x400?text=몽환+Image+3',
    ],
  },
  {
    id: 3,
    name: '포토이즘 스튜디오',
    description: '다양한 컨셉 촬영 가능',
    images: [
      'https://via.placeholder.com/600x400?text=포토이즘+Image+1',
      'https://via.placeholder.com/600x400?text=포토이즘+Image+2',
      'https://via.placeholder.com/600x400?text=포토이즘+Image+3',
      'https://via.placeholder.com/600x400?text=몽환+Image+3',
      'https://via.placeholder.com/600x400?text=몽환+Image+3',
    ],
  },
];

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<any[]>(mockResults); // 초기 빈배열[]
  const [isSearching, setIsSearching] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('q') || '';

  // //api 호출코트 (임시)
  //   useEffect(() => {
  //     const fetchResults = async () => {
  //       // API 호출
  //       const results = await fetch(`/{VITE_TOUCHEESE_API}/studios?query=${encodeURIComponent(searchTerm)}`).then((res) => res.json());
  //       setSearchResults(results);
  //       setIsSearching(false);
  //     };

  //     fetchResults();
  //   }, [searchTerm, navigate]);

  const handleSearch = (term: string) => {
    navigate(`/search/results?q=${encodeURIComponent(term)}`, { replace: true });
    setIsSearching(true);

    // Mock 데이터 필터링
    const filteredResults = mockResults.filter((studio) => studio.name.includes(term) || studio.description.includes(term));
    setIsSearching(false);
    setSearchResults(filteredResults);
  };

  return (
    <div>
      <div css={searchHeaderStyle}>
        <BackButton to="/search" replace ariaLabel="검색 페이지로 돌아가기" />
        <SearchBar onSearch={handleSearch} />
      </div>

      {isSearching ? <p>검색 중...</p> : searchResults.length > 0 ? <StudioList results={searchResults} /> : <p>스튜디오 검색 결과가 없습니다.</p>}
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
