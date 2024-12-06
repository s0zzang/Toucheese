/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import variables from '@styles/Variables';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState('');
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('q') || '';

  useEffect(() => {
    if (searchTerm) {
      setInputValue(searchTerm);
    }
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    if (term.trim()) {
      const savedSearches = localStorage.getItem('recentSearches');
      const recentSearches = savedSearches ? JSON.parse(savedSearches) : [];

      if (!recentSearches.includes(term)) {
        recentSearches.unshift(term);
        if (recentSearches.length > 10) {
          recentSearches.pop();
        }
      }

      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));

      onSearch(term);
      setInputValue('');
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div css={containerStyle}>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyUp={handleKeyUp} placeholder="스튜디오를 검색해보세요." css={inputStyle} />
      <img src="/img/icon-search2.svg" alt="검색모양아이콘" css={searchIconStyle} />
      {inputValue && (
        <button onClick={handleClear} css={clearButtonStyle}>
          <img src="/img/icon-xcircle.svg" alt="모두지우기버튼" css={clearIconStyle} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

const containerStyle = css`
  position: relative;
  border-radius: 20px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const inputStyle = css`
  font-size: 18px;
  padding: 0 40px;
  color: ${variables.colors.gray500};

  &:focus {
    border: 2px solid ${variables.colors.gray500};
    outline: none;
  }
`;

const searchIconStyle = css`
  position: absolute;
  left: 15px;
  width: 24px;
  height: 24px;
`;

const clearButtonStyle = css`
  position: absolute;
  cursor: pointer;
  right: 25px;
`;

const clearIconStyle = css`
  width: 16px;
  height: 16px;
  display: block;
`;
