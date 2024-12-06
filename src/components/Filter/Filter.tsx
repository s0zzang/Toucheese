import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import variables from '@styles/Variables';

const Filter = () => {
  const filterList = ['인기순', '가격대', '매장정보'];
  // const [selectedFilter, setSelectedFilter] = useState<string | boolean>(false);

  // const handleButtonClick = (filter: string) => {
  //   setSelectedFilter(filter);
  // };

  return (
    <FilterStyle>
      <Button text="" type="reset" variant="gray" icon={<img src="./img/icon-reset.svg" alt="필터 초기화" />} />
      {filterList.map((v) => (
        <Button
          key={v}
          type="button"
          text={`${v}`}
          variant="white"
          size="small"
          width="fit"
          icon={<img src="./img/icon-select-arrow.svg" alt="닫기 아이콘" />}
          iconSizeWidth="1rem"
          iconSizeHeight="0.4rem"
          iconPosition="right"
          // onClick={() => handleButtonClick(v)}
          disabled={false}
        />
      ))}
    </FilterStyle>
  );
};

const FilterStyle = styled.ul`
  background-color: ${variables.colors.white};
  box-shadow: 0 0 3px ${variables.colors.gray400};
  display: flex;
  gap: 0.6rem;
  padding: 1.2rem 0 1.2rem 1.6rem;
  margin-bottom: 0.6rem;
  align-items: center;

  button:first-of-type {
    margin-right: 1rem;
  }
`;

export default Filter;
