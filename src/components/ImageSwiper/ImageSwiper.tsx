/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import 'swiper/css';
import { Mousewheel } from 'swiper/modules';

interface ImageSwiperProps extends SwiperProps {
  images: string[];
}

const ImageSwiper = ({ images, modules = [Mousewheel], mousewheel = { forceToAxis: true, sensitivity: 1 }, spaceBetween = 3, slidesPerView = 4, ...props }: ImageSwiperProps) => {
  return (
    <Swiper modules={modules} mousewheel={mousewheel} spaceBetween={spaceBetween} slidesPerView={slidesPerView} {...props}>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img css={imageStyle} src={image} alt={`이미지 ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;

const imageStyle = css``;
