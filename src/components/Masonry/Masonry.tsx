/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { ReactNode } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const MasonryList = ({
  children,
  gap = '.2rem',
  breakPoints = { 300: 2, 1024: 2 },
  ...rest
}: {
  children: ReactNode;
  gap?: string;
  breakPoints?: { [key: number]: number };
}) => {
  const masonryItem = css`
    cursor: pointer;

    img {
      width: 100%;
      height: auto;
      vertical-align: top;
    }
  `;

  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={breakPoints}>
        <Masonry css={masonryItem} gutter={gap} {...rest}>
          {children}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};

export default MasonryList;
