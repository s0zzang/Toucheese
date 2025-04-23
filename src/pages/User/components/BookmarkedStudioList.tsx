/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IStudioItem } from 'types/types';
import BookmarkedStudioItem from './BookmarkedStudioItem';

const BookmarkedStudioList = ({
  data,
  handleUnbookmark,
}: {
  data: IStudioItem[];
  handleUnbookmark: () => void;
}) => {
  return (
    <ul
      css={css`
        padding: 1.8rem 0;
      `}
    >
      {data.map((item) => (
        <BookmarkedStudioItem key={item.id} item={item} handleUnbookmark={handleUnbookmark} />
      ))}
    </ul>
  );
};

export default BookmarkedStudioList;
