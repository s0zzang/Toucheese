/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import MasonryList from '@components/Masonry/Masonry';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IReviewImages } from 'types/types';

interface IReviewImagesResponse {
  content: IReviewImages[];
  totalElements: number;
  totalPages: number;
  // ... 기타 필요한 필드
}

const StudioReviewPhotos = () => {
  const { _id } = useParams();
  const [reviewImages, setReviewImages] = useState<IReviewImagesResponse>({
    content: [],
    totalElements: 0,
    totalPages: 0,
  });

  const fetchReviewImage = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/${_id}/reviewImage`);
      if (!response.ok) {
        throw new Error('리뷰 이미지를 불러오는데 실패했습니다');
      }
      const data = await response.json();
      setReviewImages(data);
    } catch (error) {
      console.error('리뷰 이미지 조회 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchReviewImage();
  }, []);

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
