/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import 'swiper/css';
import { Mousewheel } from 'swiper/modules';
import variables from '@styles/Variables';
import { IPortfolio, IReviewImages } from 'types/types';

interface ImageSwiperProps extends SwiperProps {
  images: IPortfolio[] | IReviewImages[];
}

const ImageSwiper = ({ images, modules = [Mousewheel], mousewheel = { forceToAxis: true, sensitivity: 1 }, spaceBetween = 3, slidesPerView = 4, ...props }: ImageSwiperProps) => {
  // 이미지 5개 불러오기
  const getImages = (photos: IPortfolio[] | IReviewImages[]) => {
    let images: string[] = [];
    const porfolios = photos.slice(0, 5);

    if (porfolios.length) {
      porfolios.forEach((photo: IPortfolio | IReviewImages) => {
        images.push(photo.url);
      });
    } else {
      images.push('/img/img-nopic.png');
    }

    return images;
  };

  return (
    <Swiper
      css={css`
        width: calc(100% + ${variables.layoutPadding});
        height: 11.8rem;
        margin-right: ${variables.layoutPadding};
        margin-bottom: 1.4rem;
      `}
      modules={modules}
      mousewheel={mousewheel}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      {...props}
    >
      {getImages(images).map((image, index) => (
        <SwiperSlide key={index}>
          <img css={imageStyle} src={image} alt={`이미지 ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;

const imageStyle = css`
  width: 9.4rem;
  height: 11.8rem;
  object-fit: cover;
`;
