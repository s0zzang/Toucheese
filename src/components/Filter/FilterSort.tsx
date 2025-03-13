/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useFilterStore } from '@store/useFilterStore';
import { TypoBodyMdR, TypoBodyMdSb } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';
import { SortBy } from 'types/types';

interface FilterProps {
  params: URLSearchParams;
}

const sortBy: SortBy = {
  VIEW_COUNT: '조회순',
  POPULARITY: '인기순',
  RATING: '평점순',
  REVIEW_COUNT: '리뷰 많은순',
};

const FilterSort = ({ params }: FilterProps) => {
  const [activeText, setActiveText] = useState<string>('기본순');
  const [isDrop, setIsDrop] = useState(false);
  const { setSortBy } = useFilterStore();

  useEffect(() => {
    const keyword = sortBy as SortBy;
    setActiveText(keyword[params.get('sortBy') as keyof SortBy] || '기본순');
  }, [params]);

  const onClick = () => {
    setIsDrop((prev) => !prev);
  };

  const onSelectSort = (key: keyof SortBy) => {
    setActiveText(sortBy[key]);
    setIsDrop(false);
    setSortBy(key);
  };
  const filteredSortBy = Object.entries(sortBy).filter(([, value]) => value !== activeText);

  return (
    <>
      <FilterDividerStyle />
      <h2
        css={css`
          ${TypoBodyMdSb}
          color: ${variables.colors.gray800};
          margin-bottom: 0.8rem;
        `}
      >
        매장정렬
      </h2>

      <Button
        type="button"
        text={activeText || '기본순'}
        variant="white"
        size="small"
        width="max"
        icon={<img src="/img/icon-arrowdown.svg" alt="닫기 아이콘" />}
        iconSizeWidth="1.6rem"
        iconSizeHeight="1.6rem"
        iconPosition="right"
        disabled={false}
        active={window.location.search.includes('sortBy')}
        onClick={onClick}
        style={buttonpropstyle}
      />
      {isDrop && (
        <DropdownWrapper>
          <DropdownList>
            {filteredSortBy.map(([key, value]) => (
              <DropdownItem key={key} onClick={() => onSelectSort(key as keyof SortBy)}>
                {value}
              </DropdownItem>
            ))}
          </DropdownList>
        </DropdownWrapper>
      )}

      <FilterDividerStyle />
    </>
  );
};

export default FilterSort;

const FilterDividerStyle = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: ${variables.colors.gray300};
  margin: 2rem 0;
`;

const buttonpropstyle = css`
  justify-content: start;
  ${TypoBodyMdR}

  & > div > img {
    position: absolute;
    right: 1rem;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  ${TypoBodyMdR}
  color: ${variables.colors.gray900};
`;

const DropdownList = styled.ul`
  position: absolute;
  width: 100%;
  background: white;
  border: 0.1rem solid ${variables.colors.gray400};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.6rem;
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 0.8rem 1rem;
  cursor: pointer;
`;
