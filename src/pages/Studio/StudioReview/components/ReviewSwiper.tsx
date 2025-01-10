/** @jsxImportSource @emotion/react */

import DimSwiper, { SlideImgBox } from '@components/Swiper/DimSwiper';
import { useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { IReviewImages } from 'types/types';
import StarRating from './StarRating';
import { css } from '@emotion/react';
import { TypoTitleXsM } from '@styles/Common';

const ReviewSwiper = ({ data }: { data: IReviewImages[] }) => {
  const [slideSet, setSlideSet] = useState<IReviewImages[]>([]);

  const renderSlides = () => {
    return slideSet.map((slide) => (
      <SwiperSlide key={slide.id} virtualIndex={slide.id}>
        <p>{slide.userName}</p>
        <StarRating rating={slide.rating || 0} />
        <div css={[SlideImgBox]}>
          <img src={slide.url} alt={`리뷰 이미지 ${slide.id}`} />
        </div>
        <div>
          <h1
            css={css`
              ${TypoTitleXsM}
            `}
          >
            {slide.menuName}
          </h1>
          <p
            css={css`
              opacity: 0.6;
              margin-bottom: 0.8rem;
            `}
          >
            컷 추가 수정
          </p>
          <p>{slide.reviewContent}</p>
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <DimSwiper<IReviewImages> data={data} setSlideSet={setSlideSet}>
      {slideSet && renderSlides()}
    </DimSwiper>
  );
};

export default ReviewSwiper;
