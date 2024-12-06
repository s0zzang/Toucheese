import styled from '@emotion/styled';
import useBottomSheetState from '@store/useBottomSheetStateStroe';
import { TypoTitleSmS } from '@styles/Common';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FilterTextSelector = () => {
  const FilterByPopularity = ['인기순', '조회순', '평점순', '리뷰 많은순'];
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const navigate = useNavigate();
  const { closeBottomSheet } = useBottomSheetState();

  const handleClick = (item: string) => {
    setSelectedIndex(item);
    const Nav = item === '인기순' ? 'POPULARITY' : '조회순' ? 'VIEW_COUNT' : '평점순' ? 'RATING' : 'REVIEW_COUNT';
    navigate(`/?sortBy=${Nav}`);
    closeBottomSheet();
  };

  return (
    <PopularBox>
      <ul>
        {FilterByPopularity.map((v, i) => (
          <ListItem key={i} onClick={() => handleClick(v)} isSelected={selectedIndex === v}>
            {v}
          </ListItem>
        ))}
      </ul>
    </PopularBox>
  );
};

const PopularBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  ${TypoTitleSmS};
`;

const ListItem = styled.li<{ isSelected: boolean }>`
  cursor: pointer;
  display: block;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  ${(props) =>
    props.isSelected &&
    `
    &::after {
        content: '';
        position: absolute;
        top: 25%;
        transform: translateX(100%);
        width: 1.5rem;
        height: 1.1rem;
        background-size: contain;
        background-image: url('/img/icon-check.svg');
      }
  `}
`;

export default FilterTextSelector;
