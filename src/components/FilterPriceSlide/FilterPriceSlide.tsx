/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import useResetState from '@hooks/useResetState';
import useBottomSheetState from '@store/useBottomSheetStateStroe';
import variables from '@styles/Variables';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** 가격 트리거 호출 시 가격설정을 양방향으로 할 수 있는 컴포넌트 */
const FilterPriceSlideComponent = () => {
  const fixedMinPrice = 10000; // 최소값을 1만원으로 변경
  const fixedMaxPrice = 200000; // 최대값을 20만원으로 변경
  const priceGap = 5000; // 최소-최대 값 간 간격

  const navigate = useNavigate();
  const { closeBottomSheet } = useBottomSheetState();

  const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
  const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
  const [rangeMinPercent, setRangeMinPercent] = useState(0);
  const [rangeMaxPercent, setRangeMaxPercent] = useState(100);

  const priceRangeMinValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value + priceGap <= rangeMaxValue) {
      setRangeMinValue(value);
    }
  };
  // 기존 파람스를 가져와 새로 추가하는 방식으로 업데이트
  const handleApplyClick = () => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('minPrice', rangeMinValue.toString());
    currentParams.set('maxPrice', rangeMaxValue.toString());
    navigate(`?${currentParams.toString()}`);
    closeBottomSheet();
  };

  const priceRangeMaxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value - priceGap >= rangeMinValue) {
      setRangeMaxValue(value);
    }
  };

  const twoRangeHandler = () => {
    setRangeMinPercent((rangeMinValue / fixedMaxPrice) * 100);
    setRangeMaxPercent((rangeMaxValue / fixedMaxPrice) * 100);
  };

  // 리셋 하는 공통 hook 호출
  const { resetState } = useResetState(setRangeMinValue, fixedMinPrice);

  // 상태를 초기화하는 함수 호출
  const handleResetClick = () => {
    resetState();
  };

  return (
    <>
      <ValueDisplay>
        <ValueDisplaySpanStyle>{rangeMinValue}원~ </ValueDisplaySpanStyle>
        <ValueDisplaySpanStyle>{rangeMaxValue} 원 이상</ValueDisplaySpanStyle>
      </ValueDisplay>
      <FilterPriceRangeWrap>
        <FilterPriceRangeMin
          type="range"
          min={fixedMinPrice}
          max={fixedMaxPrice - priceGap}
          step="1000"
          value={rangeMinValue}
          aria-label="slider1"
          onChange={(e) => {
            priceRangeMinValueHandler(e);
            twoRangeHandler();
          }}
        />
        <FilterPriceRangeMax
          type="range"
          min={fixedMinPrice + priceGap}
          max={fixedMaxPrice}
          step="1000"
          aria-label="slider2"
          value={rangeMaxValue}
          onChange={(e) => {
            priceRangeMaxValueHandler(e);
            twoRangeHandler();
          }}
        />
        <PriceRangeTrack>
          <TrackFilled
            style={{
              left: `${rangeMinPercent + 1}%`,
              right: `${100 - rangeMaxPercent}%`,
            }}
          />
        </PriceRangeTrack>
      </FilterPriceRangeWrap>
      <RangeDisplay>
        <RangeDisplaySpanStyle>1만원</RangeDisplaySpanStyle>
        <RangeDisplaySpanStyle>10만원</RangeDisplaySpanStyle>
        <RangeDisplaySpanStyle>20만원</RangeDisplaySpanStyle>
      </RangeDisplay>
      <ButtonWrapperStyle>
        <Button size="large" disabled={false} text={`초기화`} width="fit" variant="gray" onClick={handleResetClick} type="button" />
        <Button size="large" disabled={false} text={`적용하기`} width="max" variant="black" onClick={handleApplyClick} type="button" />
      </ButtonWrapperStyle>
    </>
  );
};

export default FilterPriceSlideComponent;

const FilterPriceRangeWrap = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
`;

const FilterPriceRangeMin = styled.input`
  position: absolute;
  pointer-events: none;
  top: 0;
  height: 7px;
  width: 100%;
  appearance: none;
  background: none;
  z-index: 1;

  &::-webkit-slider-thumb {
    height: 2.8rem;
    pointer-events: auto;
    width: 2.8rem;
    border-radius: 50%;
    border: 0.2rem solid ${variables.colors.primary};
    background-color: #fff8e1;
    -webkit-appearance: none;
    z-index: 99;
    margin-top: -1.2rem;
  }
`;

const FilterPriceRangeMax = styled(FilterPriceRangeMin)``;

const PriceRangeTrack = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 0.8rem;
  background-color: ${variables.colors.gray200};
  border-radius: ${variables.borderRadius};
`;

const TrackFilled = styled.div`
  position: absolute;
  height: 0.8rem;
  background-color: ${variables.colors.primary700};
`;

const ValueDisplay = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;
const ValueDisplaySpanStyle = styled.span`
  font-size: ${variables.size.large};
  font-weight: 600;
`;
const RangeDisplay = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3.6rem;
`;
const RangeDisplaySpanStyle = styled.span`
  font-size: ${variables.size.medium};
  color: ${variables.colors.gray500};
`;

const ButtonWrapperStyle = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 3.2rem;
`;
