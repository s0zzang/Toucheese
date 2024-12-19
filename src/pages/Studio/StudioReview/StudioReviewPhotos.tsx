/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import Header from '@components/Header/Header';
import MasonryList from '@components/Masonry/Masonry';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';
import { IReviewImages } from 'types/types';

interface IReviewImagesResponse {
  totalElements: number;
  totalPages: number;
  imageDtos: IReviewImages[];
}

const StudioReviewPhotos = () => {
  const { _id } = useParams(); // 스튜디오 아이디

  const fetchReviewImage = async () => {
    // 리뷰사진 모아보기 조회
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
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
    retry: 3,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!reviewImages) return null;

  const handleImageClick = () => {
    console.log('이미지 클릭됨');
  };

  return (
    <>
      <Header title="리뷰 사진 모아보기" />
      <StudioReviewPhotosContainerStyle>
        <ButtonWrapperStyle>
          <Button text="전체11" variant="white" active={false} size="small" width="fit" />
          <Button text="전체12" variant="white" active={false} size="small" width="fit" />
          <Button text="전체13" variant="white" active={false} size="small" width="fit" />
          <Button text="전체14" variant="white" active={false} size="small" width="fit" />
        </ButtonWrapperStyle>

        <MasonryList>
          {reviewImages.imageDtos.map(({ id, url }) => (
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

const StudioReviewPhotosContainerStyle = styled.div`
  width: 100%;
`;
const ButtonWrapperStyle = styled.div`
  display: flex;
  gap: 0.8rem;
  padding: 1.2rem;
  width: 100%;
`;
