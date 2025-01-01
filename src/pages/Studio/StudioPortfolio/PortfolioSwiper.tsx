/** @jsxImportSource @emotion/react */

import DimSwiper, { SlideImgBox } from '@components/Swiper/DimSwiper';
import { css } from '@emotion/react';
import { TypoBodyMdR } from '@styles/Common';
import { useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { IPortfolio } from 'types/types';

const PortfolioSwiper = ({ data, studioName }: { data: IPortfolio[]; studioName: string }) => {
  const [slideSet, setSlideSet] = useState<IPortfolio[]>([]);

  return (
    <DimSwiper data={data} setSlideSet={setSlideSet}>
      {slideSet &&
        slideSet.map(({ id, url, menuName }) => (
          <SwiperSlide key={id} virtualIndex={id}>
            <div css={[SlideImgBox, portfolioSlide]}>
              <img src={url} alt={`${studioName}-${id}`} />
            </div>
            <p css={TypoBodyMdR}>{menuName}</p>
          </SwiperSlide>
        ))}
    </DimSwiper>
  );
};

export default PortfolioSwiper;

const portfolioSlide = css`
  margin-top: 4rem;
`;
