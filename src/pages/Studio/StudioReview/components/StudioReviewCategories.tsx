/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { useState } from 'react';
import Dropdown from './DropDown';
import { TypoBodyMdM } from '@styles/Common';

interface StudioReviewCategoriesProps {
  avgRating?: number;
  totalReviewNum: number;
  menuNameList: string[];
  menuIdList: number[];
  onFilterChange: (menuId: number | null) => void;
}

/** 리뷰에 대한 필터링 컴포넌트 */
const StudioReviewCategories = ({
  avgRating,
  totalReviewNum,
  menuNameList,
  menuIdList,
  onFilterChange,
}: StudioReviewCategoriesProps) => {
  const FILTER_OPTIONS = ['전체리뷰', ...menuNameList];
  const [selectedOption, setSelectedOption] = useState('전체리뷰');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);

    const menuIndex = menuNameList.indexOf(option);
    const selectedMenuId = option === '전체리뷰' ? null : menuIdList[menuIndex];
    onFilterChange(selectedMenuId);
  };

  return (
    <Container>
      <RatingWrapper>
        <RatingIcon src="/img/icon-rating.svg" alt="평점" />
        <RatingScore>{avgRating}</RatingScore>
        <ReviewCount>{totalReviewNum}개의 리뷰</ReviewCount>
      </RatingWrapper>
      <CategoryWrapper>
        <Dropdown
          options={FILTER_OPTIONS}
          selectedOption={selectedOption}
          onSelect={handleOptionSelect}
        />
      </CategoryWrapper>
    </Container>
  );
};

export default StudioReviewCategories;

const Container = styled.div`
  width: 100%;
  padding: 1.8rem 0;
`;

const CategoryWrapper = styled.div`
  margin-top: 1rem;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const RatingIcon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.4rem;
  display: flex;
  align-items: center;
`;

const RatingScore = styled.p`
  margin-right: 0.8rem;
  font-size: ${TypoBodyMdM};
`;
const ReviewCount = styled.p`
  color: ${variables.colors.black};
  display: flex;
`;
