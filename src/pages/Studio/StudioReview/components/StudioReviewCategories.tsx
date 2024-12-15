/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { useState } from 'react';

/** 리뷰에 대한 필터링 컴포넌트 */
const StudioReviewCategories = () => {
  const FILTER_OPTIONS = ['전체리뷰', '높은 평점순', '낮은 평점순', '최신순'];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('전체리뷰');

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <Container>
      <CategoryWrapper>
        <DropdownContainer>
          <FilterDropdown onClick={handleToggleDropdown}>
            {selectedOption}
            <DropdownIcon isOpen={isOpen}>
              <img src="/img/icon-arrow-down.svg" alt="드롭다운 화살표" />
            </DropdownIcon>
          </FilterDropdown>
          {isOpen && (
            <OptionList>
              {FILTER_OPTIONS.map((option) => (
                <OptionItem key={option} onClick={() => handleSelectOption(option)} isSelected={option === selectedOption}>
                  {option}
                </OptionItem>
              ))}
            </OptionList>
          )}
        </DropdownContainer>
        <Button text="사진 리뷰만 보기" variant="white" active={false} size="small" width="fit" />
      </CategoryWrapper>
      <RatingWrapper>
        <RatingIcon src="/img/icon-rating.svg" alt="평점" />
        <RatingScore>5.0</RatingScore>
        <ReviewCount>1,234개의 리뷰</ReviewCount>
      </RatingWrapper>
    </Container>
  );
};

export default StudioReviewCategories;

const Container = styled.div`
  width: 100%;
  padding: 1.8rem 0;
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownIcon = styled.span<{ isOpen: boolean }>`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease-in-out;
`;

const OptionList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid ${variables.colors.gray400};
  border-radius: ${variables.borderRadius};
  margin-top: 0.4rem;
  z-index: 1;
`;

const OptionItem = styled.li<{ isSelected: boolean }>`
  padding: 0.8rem 1rem;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? variables.colors.gray100 : 'white')};

  &:hover {
    background-color: ${variables.colors.gray100};
  }
`;

// FilterDropdown 스타일 수정
const FilterDropdown = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  min-width: 22rem;
  height: 3.3rem;
  padding: 0.8rem 1rem;
  border: 1px solid ${variables.colors.gray400};
  border-radius: ${variables.borderRadius};
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const RatingIcon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.2rem;
`;

const RatingScore = styled.p`
  font-weight: 600;
  margin-right: 0.8rem;
`;

const ReviewCount = styled.p`
  color: ${variables.colors.black};
  display: flex;
`;
