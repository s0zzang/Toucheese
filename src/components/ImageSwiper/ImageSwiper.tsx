/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import 'swiper/css';
import { Mousewheel, Pagination } from 'swiper/modules';
import variables from '@styles/Variables';
import { IPortfolio, IReviewImages } from 'types/types';

interface ImageSwiperProps extends SwiperProps {
  images: IPortfolio[] | IReviewImages[];
  imageStyle?: ReturnType<typeof css>;
  customStyle?: ReturnType<typeof css>;
  imgprops?: {
    customStyle?: ReturnType<typeof css>;
    loading?: string;
    onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  };
}

const ImageSwiper = ({
  images,
  modules = [Mousewheel, Pagination],
  mousewheel = { forceToAxis: true, sensitivity: 1 },
  spaceBetween = 3,
  slidesPerView = 3.6,
  imageStyle,
  customStyle,
  ...props
}: ImageSwiperProps) => {
  const isPaginationActive = slidesPerView === 1;
  // 이미지 5개 불러오기
  const getImages = (photos: IPortfolio[] | IReviewImages[]) => {
    let images: string[] = [];
    const portfolios = photos.slice(0, 5);

    if (portfolios.length) {
      portfolios.forEach((photo: IPortfolio | IReviewImages) => {
        images.push(photo.url);
      });
    } else {
      images.push('/img/img-nopic.png');
    }

    return images;
  };

  const conditionalContainerStyle = slidesPerView === 1 ? containerFullStyle : containerDefaultStyle;

  return (
    <div css={conditionalContainerStyle}>
      <Swiper
        css={[swiperStyle, customStyle]}
        modules={modules}
        mousewheel={mousewheel}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        pagination={isPaginationActive ? { clickable: true, type: 'bullets' } : undefined}
        {...props}
      >
        {getImages(images).map((image, index) => (
          <SwiperSlide key={index}>
            <img css={[defaultImageStyle, imageStyle]} src={image} alt={`이미지 ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSwiper;

const containerFullStyle = css`
  margin-left: calc(-1 * ${variables.layoutPadding});
`;

const containerDefaultStyle = css`
  width: 100%;
  margin-bottom: 1.4rem;
`;

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
