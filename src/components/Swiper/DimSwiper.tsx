/** @jsxImportSource @emotion/react */

import { useDimSwiperStore } from '@store/useDimSwiper';
import { Dispatch, ReactNode, SetStateAction, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Navigation, Virtual } from 'swiper/modules';
import { Swiper, SwiperClass } from 'swiper/react';
import { IPortfolio } from 'types/types';

import 'swiper/css';
import { TypoBodyMdR } from '@styles/Common';
import { css } from '@emotion/react';

interface IDimSwiper {
  children: ReactNode;
  data: IPortfolio[];
  setSlideSet: Dispatch<SetStateAction<IPortfolio[]>>;
}

const DimSwiper = ({ children, data, setSlideSet }: IDimSwiper) => {
  const { selectedId, setSelectedId } = useDimSwiperStore();
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [firstSlide, setFirstSlide] = useState<number>();
  const [lastSlide, setLastSlide] = useState<number>();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const slideIndexMap = useMemo(() => new Map(), []);

  const getNewSlideSet = (clickedId: number) => {
    return data.filter(({ id }: { id: number }) => id === clickedId || id === clickedId - 1 || id === clickedId + 1);
  };

  const setIndexByPortfolioId = () => {
    for (let i = 0; i < data.length; i++) {
      slideIndexMap.set(data[i].id, i + 1);
    }
  };

  const handleChange = () => {
    if (!swiperRef || !firstSlide || !lastSlide) return null;
    const toNext = swiperRef.swipeDirection === 'next';
    const direction = toNext ? 1 : -1;

    // 첫번째, 마지막 슬라이드에서 슬라이드 변경 금지
    if (selectedId === firstSlide) if (!toNext) return;
    if (selectedId === lastSlide) if (toNext) return;

    // 두번째 슬라이드에서 이전 방향으로 변경된 경우
    if (selectedId === firstSlide + 1 && !toNext) {
      setSelectedId(selectedId, direction);
      swiperRef.slideTo(0, 0, false);
      return;
    }

    setSelectedId(selectedId, direction);
    swiperRef.slideTo(1, 0, false);
  };

  const swiperOption = {
    modules: [Virtual, Navigation],
    onSwiper: (e: SwiperClass) => setSwiperRef(e),
    onTransitionEnd: handleChange,
    slidesPerView: 1,
    initialSlide: selectedId === firstSlide ? 0 : 1,
    centeredSlides: true,
    spaceBetween: 20,
  };

  useEffect(() => {
    setIndexByPortfolioId();
    if (data) {
      setFirstSlide(data[0].id);
      setLastSlide(data[data.length - 1].id);
    }
  }, []);

  useLayoutEffect(() => {
    setSlideSet(getNewSlideSet(selectedId));
    setActiveIndex(slideIndexMap.get(selectedId));
  }, [selectedId]);

  return (
    firstSlide && (
      <>
        <h2 css={[TypoBodyMdR, TitleStyle]}>
          {activeIndex} / {data.length}
        </h2>
        <Swiper {...swiperOption}>{children}</Swiper>
      </>
    )
  );
};

export default DimSwiper;

const TitleStyle = css`
  padding: 1.8rem 0;
  text-align: center;
  position: absolute;
  inset: 0;
  bottom: auto;
`;

export const SlideImgBox = css`
  background: #0f0f0f;
  padding: 1rem;
  border-radius: 0.6rem;
  margin-bottom: 1rem;

  img {
    aspect-ratio: 308/340;
    object-fit: scale-down;
  }
`;
