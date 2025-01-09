/** @jsxImportSource @emotion/react */

import DimSwiper, { SlideImgBox } from '@components/Swiper/DimSwiper';
import { useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { IReviewImages } from 'types/types';

const ReviewSwiper = ({ data }: { data: IReviewImages[] }) => {
  const [slideSet, setSlideSet] = useState<IReviewImages[]>([]);

  return (
    <DimSwiper<IReviewImages> data={data} setSlideSet={setSlideSet}>
      {slideSet &&
        slideSet.map(({ id, url }) => (
          <SwiperSlide key={id} virtualIndex={id}>
            <div css={[SlideImgBox]}>
              <img src={url} alt={`리뷰 이미지 ${id}`} />
            </div>
            <p>기타 내용 작성</p>
          </SwiperSlide>
        ))}
    </DimSwiper>
  );
};

export default ReviewSwiper;
