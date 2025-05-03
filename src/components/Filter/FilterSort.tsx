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
      <h3
        css={css`
          ${TypoBodyMdSb}
          color: ${variables.colors.gray800};
          margin-bottom: 0.8rem;
        `}
      >
        스튜디오 정렬
      </h3>

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
        active={false}
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
    </>
  );
};

export default FilterSort;

const buttonpropstyle = css`
  justify-content: start;
  ${TypoBodyMdR}
  position: relative;

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
  margin-top: 0.6rem;
  top: -1px;
  width: 100%;
  background: white;
  border: 1px solid ${variables.colors.gray400};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: ${variables.borderRadius};
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 0.8rem 1rem;
  cursor: pointer;
`;
