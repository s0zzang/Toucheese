/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Mousewheel, Pagination } from 'swiper/modules';
import variables from '@styles/Variables';

interface ImageSwiperProps extends SwiperProps {
  images: string[];
  imageStyle?: ReturnType<typeof css>;
}

const ImageSwiper = ({
  images,
  modules = [Mousewheel, Pagination, Autoplay],
  mousewheel = { forceToAxis: true, sensitivity: 1 },
  spaceBetween = 3,
  slidesPerView = 4,
  imageStyle,
  ...props
}: ImageSwiperProps) => {
  const isPaginationActive = slidesPerView === 1;

  return (
    <Swiper
      css={swiperStyle}
      modules={modules}
      mousewheel={mousewheel}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      pagination={isPaginationActive ? { clickable: true, type: 'bullets' } : undefined}
      autoplay={isPaginationActive ? { delay: 3000, disableOnInteraction: false } : undefined}
      {...props}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img css={[defaultImageStyle, imageStyle]} src={image} alt={`이미지 ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;

const swiperStyle = css`
  width: calc(100% + ${variables.layoutPadding});
  margin-right: ${variables.layoutPadding};
  margin-bottom: 1.4rem;

  .swiper-pagination {
    position: absolute;
    bottom: 15px;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 10;
  }

  .swiper-pagination-bullet {
    background-color: ${variables.colors.white};
    opacity: 0.8;
    width: 20px;
    height: 3px;
    transition: all 0.3s ease;
    margin: 0 1px;
    cursor: pointer;
  }

  .swiper-pagination-bullet-active {
    background-color: ${variables.colors.black};
    opacity: 1;
  }
`;

const defaultImageStyle = css`
  width: 100%;
  height: auto;
  object-fit: cover;
`;
