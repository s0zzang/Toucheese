/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import useBookmark from '@hooks/useBookmark';
import { Hidden } from '@styles/Common';
import variables from '@styles/Variables';
import { useState } from 'react';

const Bookmark = ({ id, count, isBookmarked }: { id: number; count: number; isBookmarked: boolean }) => {
  const [isActive, setIsActive] = useState<boolean>(isBookmarked);
  const [bookmarkCount, setBookmarkCount] = useState<number>(count);
  const handleBookmark = useBookmark(isActive);

  // 북마크 설정/해제 api 호출
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    await handleBookmark(1, id);

    setIsActive(!isActive);

    if (isActive) {
      setBookmarkCount((count) => count - 1);
    } else {
      setBookmarkCount((count) => count + 1);
    }
  };

  return (
    <BookmarkStyle>
      <button onClick={handleClick}>
        <img src={`/img/icon-bookmark-${isActive ? 'active' : 'inactive'}.svg`} alt={`북마크 ${isActive ? '해제' : '등록'}`} />
        <span css={Hidden}>북마크 {`${isActive ? '해제' : '등록'}하기`}</span>
      </button>
      <p>{bookmarkCount}</p>
    </BookmarkStyle>
  );
};

export default Bookmark;

const BookmarkStyle = styled.div`
  & > button {
    width: 2.4rem;
    height: 2.4rem;
    margin: 0 auto;

    & > img {
      width: 100%;
      aspect-ratio: 1/1;
      margin: 0 auto;
    }
  }

  & > p {
    color: ${variables.colors.gray600};
    margin: 0 auto;
    text-align: center;
    font-size: 1rem;
    line-height: 1.2;
  }
`;
