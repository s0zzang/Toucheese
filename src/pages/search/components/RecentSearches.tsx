/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import React, { useState, useEffect } from 'react';

interface RecentSearchesProps {
  onSearch: (term: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    setRecentSearches(savedSearches ? JSON.parse(savedSearches) : []);
  }, []);

  const removeSearchTerm = (indexToRemove: number) => {
    const updatedSearches = recentSearches.filter((_, index) => index !== indexToRemove);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const clearAllSearchTerms = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div
      css={css`
        border-bottom: 1px solid;
        border-color: ${variables.colors.gray200};
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <h3
          css={css`
            font-size: 1.6rem;
            font-weight: 600;
            margin-top: 1rem;
          `}
        >
          최근 검색어
        </h3>
        <button onClick={clearAllSearchTerms} css={allClearButtonStyle}>
          모두지우기
        </button>
      </div>
      <div css={searchListStyle}>
        {recentSearches.length === 0 ? (
          <p
            css={css`
              margin: 0 auto;
              font-size: 14px;
            `}
          >
            최근 검색어가 없습니다.
          </p>
        ) : (
          recentSearches.map((search, index) => (
            <div key={index} css={searchItemStyle}>
              <span>{search}</span>
              <button
                onClick={(e) => {
                  removeSearchTerm(index);
                }}
                css={deleteButtonStyle}
                aria-label={`${search} 삭제`}
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentSearches;

const allClearButtonStyle = css`
  font-size: 1.2rem;
  color: ${variables.colors.gray600};
  cursor: pointer;
`;

const searchListStyle = css`
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const searchItemStyle = css`
  position: relative;
  margin-right: 10px;
  font-size: 14px;
  padding: 5px 10px;
  border: 1px solid;
  border-radius: ${variables.borderRadius};
  border-color: ${variables.colors.gray400};
  display: flex;
  align-items: center;
`;

const deleteButtonStyle = css`
  margin-left: 5px;
  cursor: pointer;
  color: ${variables.colors.gray500};
`;
