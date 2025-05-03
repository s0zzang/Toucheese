/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import useBookmark from '@hooks/useBookmark';
import useToast from '@hooks/useToast';
import { defaultUserState } from '@store/useUserStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { Hidden, TypoBodySmR, TypoCapXsR } from '@styles/Common';
import variables from '@styles/Variables';
import { getLocalStorageItem } from '@utils/getLocalStorageItem';
import { KeyboardEvent, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { IUser } from 'types/types';

interface IBookmarkState {
  isActive: boolean;
  count: number;
}

const Bookmark = ({
  id,
  count: initialCount,
  isBookmarked: initialBookmark,
  type = 'default',
  handleUnbookmark,
}: {
  id: number;
  count: number;
  isBookmarked: boolean;
  type: 'default' | 'bookmark';
  handleUnbookmark?: () => void;
}) => {
  const [bookmark, setBookmark] = useState<IBookmarkState>({
    isActive: initialBookmark,
    count: initialCount,
  });
  const handleBookmark = useBookmark(bookmark.isActive);
  const { accessToken } = getLocalStorageItem<IUser>('userState', defaultUserState);
  const openToast = useToast();
  const navigate = useNavigate();
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });

  // 북마크 설정/해제 api 호출
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (accessToken) {
      await handleBookmark(accessToken, id);
      setBookmark((state) => ({
        ...state,
        isActive: !state.isActive,
        count: state.isActive ? state.count - 1 : state.count + 1,
      }));

      if (handleUnbookmark) {
        handleUnbookmark();
      }
    }
    // 로그인 되지 않은 상태면 로그인 페이지로 이동
    else {
      openToast('좋아요를 누르시려면 로그인이 필요합니다!');
      navigate('/user/auth');
    }
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isPc) return;

    if (e.code === 'Enter') {
      if (accessToken) {
        await handleBookmark(accessToken, id);
        setBookmark((state) => ({
          ...state,
          isActive: !state.isActive,
          count: state.isActive ? state.count - 1 : state.count + 1,
        }));

        if (handleUnbookmark) {
          handleUnbookmark();
        }
      }
      // 로그인 되지 않은 상태면 로그인 페이지로 이동
      else {
        openToast('좋아요를 누르시려면 로그인이 필요합니다!');
        navigate('/user/auth');
      }
    }
  };

  return (
    <div css={BookmarkStyle({ type })}>
      <button type="button" onClick={handleClick} onKeyDown={handleKeyDown}>
        <img
          src={`/img/icon-bookmark-${bookmark.isActive ? 'active' : 'inactive'}.svg`}
          alt={`북마크 ${bookmark.isActive ? '해제' : '등록'}`}
        />
        <span css={Hidden}>북마크 {`${bookmark.isActive ? '해제' : '등록'}하기`}</span>
      </button>
      <p>{bookmark.count}</p>
    </div>
  );
};

export default Bookmark;

const BookmarkStyle = ({ type }: { type: 'default' | 'bookmark' }) => css`
  & > button {
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2px;
    cursor: pointer;

    & > img {
      width: 2rem;
      height: 1.8rem;
    }

    ${mqMin(breakPoints.pc)} {
      width: ${type === 'bookmark' ? '3.6rem' : '2.4rem'};
      height: ${type === 'bookmark' ? '3.6rem' : '2.4rem'};
      margin-bottom: ${type === 'bookmark' ? 'unset' : '2px'};

      & > img {
        width: ${type === 'bookmark' ? '3rem' : '2rem'};
        height: ${type === 'bookmark' ? '2.6rem' : '1.8rem'};
      }
    }
  }

  & > p {
    color: ${variables.colors.gray600};
    margin: 0 auto;
    text-align: center;

    ${TypoCapXsR}

    ${mqMin(breakPoints.pc)} {
      ${TypoBodySmR}
    }
  }
`;
