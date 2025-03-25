/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import BackButton from '@components/BackButton/BackButton';
import { Helmet } from 'react-helmet-async';
import SearchBar from '@components/Search/SearchBar';
import RecentSearches from '@components/Search/RecentSearches';
import TrendingStudios from '@components/Search/TrendingStudios';
import useGetWindowWidth from '@hooks/useGetWindowWidth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const windowWidth = useGetWindowWidth();
  const navigate = useNavigate();

  // PC 버전에는 search 페이지가 없으므로 삭제
  useEffect(() => {
    if (windowWidth >= 1024) {
      navigate('/');
    }
  }, [windowWidth]);

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
  padding-top: 2rem;
`;
