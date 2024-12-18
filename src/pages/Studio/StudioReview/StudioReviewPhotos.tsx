/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import MasonryList from '@components/Masonry/Masonry';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IReviewImages } from 'types/types';

interface IReviewImagesResponse {
  content: IReviewImages[];
  totalElements: number;
  totalPages: number;
}

const StudioReviewPhotos = () => {
  const { _id } = useParams();

  const fetchReviewImage = async () => {
    const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/${_id}/reviewImage`);
    if (!response.ok) {
      throw new Error('리뷰 이미지를 불러오는데 실패했습니다');
    }
    return response.json();
  };

  const {
    data: reviewImages,
    isLoading,
    error,
  } = useQuery<IReviewImagesResponse>({
    queryKey: ['reviewImages', _id],
    queryFn: fetchReviewImage,
    enabled: !!_id,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!reviewImages) return null;

  const handleImageClick = () => {
    console.log('이미지 클릭됨');
  };

  return (
    <>
      <SampleHeaderStyle></SampleHeaderStyle>
      <StudioReviewPhotosContainerStyle>
        <ButtonWrapperStyle>
          <Button text="전체11" variant="white" active={false} size="small" width="fit" />
          <Button text="전체12" variant="white" active={false} size="small" width="fit" />
          <Button text="전체13" variant="white" active={false} size="small" width="fit" />
          <Button text="전체14" variant="white" active={false} size="small" width="fit" />
        </ButtonWrapperStyle>

        <MasonryList>
          {reviewImages.content.map(({ id, url }) => (
            <div key={id} onClick={handleImageClick}>
              <img src={url} alt={`리뷰 이미지 ${id}`} />
            </div>
          ))}
        </MasonryList>
      </StudioReviewPhotosContainerStyle>
    </>
  );
};

export default StudioReviewPhotos;

const SampleHeaderStyle = styled.div`
  width: 100%;
  height: 5.6rem;
  box-shadow: inset 0px 0px 20px red;
`;

const StudioReviewPhotosContainerStyle = styled.div`
  width: 100%;
`;
const ButtonWrapperStyle = styled.div`
  display: flex;
  gap: 0.8rem;
  padding: 1.2rem;
  width: 100%;
`;
