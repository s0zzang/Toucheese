/** @jsxImportSource @emotion/react */
import EmptyMessage from '@components/Message/EmptyMessage';
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const navigate = useNavigate();

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

  const handleClickSearchItem = (term: string) => {
    navigate(`/search/results?keyword=${encodeURIComponent(term)}`);
  };

  return (
    <div
      css={css`
        border-bottom: 0.1rem solid;
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
          <EmptyMessage message="최근 검색어가 없습니다." />
        ) : (
          recentSearches.map((search, index) => (
            <div key={index} css={searchItemStyle}>
              <span
                onClick={() => {
                  handleClickSearchItem(search);
                }}
              >
                {search}
              </span>
              <button
                onClick={() => {
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
  cursor: pointer;
  padding: 1rem 0;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const searchItemStyle = css`
  position: relative;
  margin-right: 1rem;
  font-size: 1.4rem;
  padding: 0.5rem 1rem;
  border: 0.1rem solid;
  border-radius: ${variables.borderRadius};
  border-color: ${variables.colors.gray400};
  display: flex;
  align-items: center;
`;

const deleteButtonStyle = css`
  margin-left: 0.5rem;
  color: ${variables.colors.gray500};
`;
