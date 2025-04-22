/** @jsxImportSource @emotion/react */

import FilterPriceSlidePC from '@components/FilterPriceSlide/FilterPriceSlidePC';
import ServiceAvailability from '@components/ServiceAvailability/ServiceAvailability';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { decodeSearchParamsToString } from '@utils/decodeSearchParams';
import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { keyframes } from '@emotion/react';
import { Hidden } from '@styles/Common';
import { useFilterStore } from '@store/useFilterStore';
import { formatPrice } from '@utils/formatPrice';
import FilterSort from '@components/Filter/FilterSort';

const PCFilterWrapper = () => {
  const [searchParams] = useSearchParams();
  const [isAnimating, setIsAnimating] = useState(false); // 초기화 버튼 애니메이션 제어
  const navigate = useNavigate();
  const { minPrice, maxPrice, selectedServices, resetFilter, sortBy } = useFilterStore(); // 전역상태 저장

  // URL 파라미터 기준으로 필터 적용 상태 확인
  // const hasAppliedFilters = () => {
  //   return (
  //     searchParams.has('minPrice') || searchParams.has('maxPrice') || searchParams.has('options')
  //   );
  // };

  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams);

    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (selectedServices.length > 0) {
      params.set('options', selectedServices.join('%'));
    }
    if (sortBy) params.set('sortBy', sortBy);

    navigate(`?${decodeSearchParamsToString(params)}`);
  };

  const handleReset = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 50);
    // 전역 상태 초기화
    resetFilter();
    window.location.href = '';
    // URL 파라미터 초기화
    const paramsToDelete = ['sortBy', 'minPrice', 'maxPrice', 'options', 'sortBy'];
    paramsToDelete.forEach((param) => searchParams.delete(param));
    navigate(`?${decodeSearchParamsToString(searchParams)}`);
  };

  const handleRemoveFilter = (type: 'price' | 'service' | 'sortBy', value?: string) => {
    const params = new URLSearchParams(searchParams);

    if (type === 'price') {
      params.delete('minPrice');
      params.delete('maxPrice');
      resetFilter(); // 가격 필터 초기화
    } else if (type === 'service' && value) {
      const currentOptions = params.get('options')?.split('%') || [];
      const newOptions = currentOptions.filter((option) => option !== value);

      if (newOptions.length === 0) {
        params.delete('options');
      } else {
        params.set('options', newOptions.join('%'));
      }

      // 선택된 서비스에서 제거
      useFilterStore.setState({
        selectedServices: newOptions,
      });
    }

    navigate(`?${decodeSearchParamsToString(params)}`);
  };

  const hasActiveFilters = () => {
    return (
      searchParams.get('minPrice') || searchParams.get('maxPrice') || searchParams.get('options')
    );
  };

  return (
    <>
      <FilterSort params={searchParams} />
      <FilterChipsContainer>
        {/* 가격 필터 칩 */}
        {(searchParams.get('minPrice') || searchParams.get('maxPrice')) && (
          <ChipStyle>
            <span>
              {formatPrice(searchParams.get('minPrice') || '0')} -{' '}
              {formatPrice(searchParams.get('maxPrice') || '')}원
            </span>
            <button onClick={() => handleRemoveFilter('price')}>
              <img src="/img/icon-close-small.svg" alt="가격 필터 삭제" />
            </button>
          </ChipStyle>
        )}

        {/* 서비스 필터 칩 */}
        {searchParams
          .get('options')
          ?.split('%')
          .map((service) => (
            <ChipStyle key={service}>
              <span>{service}</span>
              <button onClick={() => handleRemoveFilter('service', service)}>
                <img src="img/icon-close-small.svg" alt="서비스 필터 삭제" />
              </button>
            </ChipStyle>
          ))}
      </FilterChipsContainer>
      {hasActiveFilters() && <FilterDividerStyle />}
      {/* 가격 조정 필터 PC */}
      <FilterPriceSlidePC />
      {/* 매장 옵션 제공 PC */}
      <FilterDividerStyle />
      <ServiceAvailability isPc={true} />

      <FilterButtonBoxStyle>
        <ButtonWrapperStyle onClick={handleReset} className={isAnimating ? 'rotateIcon' : ''}>
          <span css={Hidden}>초기화</span>
          <Button
            text=""
            type="reset"
            iconResetSize="small"
            variant="gray"
            icon={
              <RotateIconStyle
                className={isAnimating ? 'rotateIcon' : ''}
                src="/img/icon-reset.svg"
                alt="필터 초기화"
              />
            }
            onClick={handleReset}
          />
        </ButtonWrapperStyle>
        <Button
          type="button"
          size="medium"
          text={'필터 적용하기'}
          width="max"
          variant="black"
          onClick={handleApplyFilter}
        />
      </FilterButtonBoxStyle>
    </>
  );
};

export default PCFilterWrapper;

const FilterButtonBoxStyle = styled.div`
  background-color: ${variables.colors.white};
  padding: 1.6rem 0 2.6rem;
  position: fixed;
  width: 19.2rem;
  z-index: 9;
  bottom: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
`;

const ButtonWrapperStyle = styled.div`
  display: inline-block;
`;

const FilterDividerStyle = styled.div`
  border-top: 1px solid ${variables.colors.gray300};
  margin: 2rem 0;
`;

const rotateIcon = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const RotateIconStyle = styled.img`
  &.rotateIcon {
    animation: ${rotateIcon} 0.4s ease-out;
  }
`;

const FilterChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 2rem;
`;

const ChipStyle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 1.2rem;
  height: 3.2rem;
  border: 1px solid;
  border-color: ${variables.colors.gray400};
  border-radius: ${variables.borderRadius};

  span {
    color: ${variables.colors.gray900};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;

    img {
      width: 0.9rem;
      height: 0.9rem;
    }
  }

  &:hover {
    background-color: ${variables.colors.gray200};
  }
`;
