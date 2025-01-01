import { useDimSwiperStore } from '@store/useDimSwiper';
import { Dispatch, ReactNode, SetStateAction, useEffect, useLayoutEffect, useState } from 'react';
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

/*
1. 첫번째, 마지막 요소에선 handleChange 이벤트 금지
- 첫번째에선 prev 금지
- 마지막에선 next 금지

-> 첫번째 마지막 요소인지 어떻게 알지? 
- data[0].id와 seletedId 비교 : seletedId가 바로 반영되지 않아서 제대로 바뀌지 않음
- 첫번째, 마지막 요소 : 아이디가 스튜디오마다 아이디가 다르기 때문에 데이터 0번과 비교해야 함
- 현재 요소 : seletedId (반영 제대로 안됨), 클릭된 그 요소 (상위, 상위 파일에서 작업해야 함)
- firstSlide : 얘도 클릭한 후에 반영돼서 사용 불가

2. 첫번째 슬라이드 예외 처리 
- 첫번째 슬라이드를 클릭한 경우 initial Slide 0번째 요소 활성화
- 첫번째 슬라이드로 이벤트가 발생한 경우 : slideTo 0번째 요소

3. 페이지네이션 
*/

const DimSwiper = ({ children, data, setSlideSet }: IDimSwiper) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const { selectedId, setSelectedId } = useDimSwiperStore();
  const [firstSlide, setFirstSlide] = useState<number>();
  const [lastSlide, setLastSlide] = useState<number>();

  const getNewSlideSet = (clickedId: number) => {
    return data.filter(({ id }: { id: number }) => id === clickedId || id === clickedId - 1 || id === clickedId + 1);
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
    modules: [Virtual, Pagination, Navigation],
    onSwiper: (e: SwiperClass) => setSwiperRef(e),
    onTransitionEnd: handleChange,
    slidesPerView: 1,
    initialSlide: selectedId === firstSlide ? 0 : 1,
    pagination: { type: 'fraction' as 'fraction' },
    centeredSlides: true,
  };

  useEffect(() => {
    if (data) {
      setFirstSlide(data[0].id);
      setLastSlide(data[data.length - 1].id);
    }
  }, []);

  useLayoutEffect(() => {
    setSlideSet(getNewSlideSet(selectedId));
  }, [selectedId]);

  return firstSlide && <Swiper {...swiperOption}>{children}</Swiper>;
};

export default DimSwiper;
