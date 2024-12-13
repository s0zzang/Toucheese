/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useState } from 'react';
import Button from '@components/Button/Button';
import { TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { useParams } from 'react-router-dom';
import StudioReviewImageList from './components/StudioReviewImageList';

/** 리뷰 페이지 (부모) */
const StudioReview = () => {
  const { _id } = useParams();
  console.log(_id);

  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterButtons = [
    { label: '전체', value: '1' },
    { label: '증명사진', value: '2' },
    { label: '상품명1', value: '3' },
    { label: '상품명2', value: '4' },
  ];

  const handleFilterClick = (value: string) => {
    setSelectedFilter(value);
    console.log('선택된 필터:', value);
  };

  return (
    <>
      <ForHeader>헤더 위치</ForHeader>
      <ForNavBar>네브바 위치</ForNavBar>
      <ReviewPhotosWrapperStyle>
        <h1 css={TypoTitleXsM}>리뷰 사진 모아보기 789</h1>
        <StudioReviewImageList />
      </ReviewPhotosWrapperStyle>

      <FilterButtonContainerStyle>
        {filterButtons.map((button) => (
          <Button
            key={button.value}
            text={button.label}
            variant="white"
            active={selectedFilter === button.value ? true : false}
            onClick={() => handleFilterClick(button.value)}
            size="small"
            width="fit"
          />
        ))}
      </FilterButtonContainerStyle>

      <TotalReviewStyle>
        <h1 css={TypoTitleXsM}>전체 리뷰 (1,300)</h1>
        <TotalReviewInnerStyle>
          <img src="/img/icon-rating.svg" alt="전체 평점" />
          <p>5.0</p>
        </TotalReviewInnerStyle>
      </TotalReviewStyle>
    </>
  );
};

export default StudioReview;

const ForHeader = styled.div`
  width: 100%;
  height: 5.6rem;
  box-shadow: inset 0px 0px 10px red;
`;

const ForNavBar = styled.div`
  width: 100%;
  height: 4rem;
  box-shadow: inset 0px 0px 10px blue;
`;

const FilterButtonContainerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  min-height: 5.4rem;
  padding: 1.2rem 0;
`;

const ReviewPhotosWrapperStyle = styled.div`
  width: 100%;
  margin-top: 2.2rem;
`;

const TotalReviewStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 3.5rem;
`;
const TotalReviewInnerStyle = styled.div`
  display: flex;
  align-items: center;

  & p {
    margin: 0;
    font-size: ${variables.size.medium};
    font-weight: 400;
    line-height: 1.5;
    padding-left: 0.5rem;
  }
`;
