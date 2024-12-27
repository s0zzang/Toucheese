import { useDimSwiperStore } from '@store/useDimSwiper';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { Navigation, Pagination, Virtual } from 'swiper/modules';
import { Swiper, SwiperClass } from 'swiper/react';
import { IPortfolio } from 'types/types';

import 'swiper/css';
import 'swiper/css/pagination';

interface IDimSwiper {
  children: ReactNode;
  data: IPortfolio[];
  setSlideSet: Dispatch<SetStateAction<IPortfolio[]>>;
}

const DimSwiper = ({ children, data, setSlideSet }: IDimSwiper) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const { selectedId, setSelectedId } = useDimSwiperStore();
  const isFirstSlide = data[0].id === selectedId;

  const getNewSlideSet = (clickedId: number) => {
    return data.filter(({ id }: { id: number }) => id === clickedId || id === clickedId - 1 || id === clickedId + 1);
  };

  const handleChange = () => {
    if (!swiperRef) return null;

    const direction = swiperRef.swipeDirection === 'next' ? 1 : -1;
    setSelectedId(selectedId, direction);
    swiperRef.slideTo(isFirstSlide ? 0 : 1, 0, false);
  };

  const swiperOption = {
    modules: [Virtual, Pagination, Navigation],
    onSwiper: (e: SwiperClass) => setSwiperRef(e),
    onTransitionEnd: handleChange,
    slidesPerView: 1,
    initialSlide: isFirstSlide ? 0 : 1,
    pagination: {
      type: 'fraction' as 'fraction',
    },
    centeredSlides: true,
  };

  useEffect(() => {
    // console.log(isFirstSlide);
    setSlideSet(getNewSlideSet(selectedId));
  }, [selectedId]);

  return <Swiper {...swiperOption}>{children}</Swiper>;
};

export default DimSwiper;
