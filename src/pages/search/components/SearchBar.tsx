/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const queryParams = new URLSearchParams(window.location.search);
  const searchTerm = queryParams.get('keyword') || '';

  const navigate = useNavigate();

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

      navigate(`/search/results?keyword=${term}`);
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
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyUp={handleKeyUp} placeholder="스튜디오를 검색해보세요." />
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
  border-radius: 2rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  input {
    font-size: 1.6rem;
    padding: 0 4rem;
    color: ${variables.colors.gray500};

    &:focus {
      border: 0.2rem solid ${variables.colors.gray500};
      outline: none;
    }
  }
`;

const searchIconStyle = css`
  position: absolute;
  left: 1.5rem;
  width: 2.4rem;
  height: 2.4rem;
`;

const clearButtonStyle = css`
  position: absolute;
  cursor: pointer;
  right: 2.5rem;
`;

const clearIconStyle = css`
  width: 1.6rem
  height: 1.6rem
  display: block;
`;
