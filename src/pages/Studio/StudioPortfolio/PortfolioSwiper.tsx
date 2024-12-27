/** @jsxImportSource @emotion/react */

import DimSwiper from '@components/Swiper/DimSwiper';
import { TypoBodyMdR } from '@styles/Common';
import { useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { IPortfolio } from 'types/types';

const PortfolioSwiper = ({ data, studioName }: { data: IPortfolio[]; studioName: string }) => {
  const [slideSet, setSlideSet] = useState<IPortfolio[]>([]);

  return (
    <DimSwiper data={data} setSlideSet={setSlideSet}>
      {slideSet &&
        slideSet.map(({ id, url, description }) => (
          <SwiperSlide key={id} virtualIndex={id}>
            <img src={url} alt={`${studioName}-${id}`} />
            <p css={TypoBodyMdR}>{description}</p>
          </SwiperSlide>
        ))}
    </DimSwiper>
  );
};

export default PortfolioSwiper;
