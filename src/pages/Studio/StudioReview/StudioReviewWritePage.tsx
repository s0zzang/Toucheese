/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import { css } from '@emotion/react';
import { TypoTitleXsM } from '@styles/Common';
import StarInput from './components/StarInput';
import Button from '@components/Button/Button';
import ImageUploadPreview from './components/ImageUploadPreview';
import TextArea from '@components/TextArea/TextArea';
import { useState, useEffect } from 'react';
import ReservationCard from '@components/ReservationCard/ReservationCard';
import { useNavigate, useParams } from 'react-router-dom';

/** 리뷰 작성 페이지  */
const StudioReviewWritePage = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [textArea, setTextArea] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // 로컬 스토리지에서 액세스 토큰 가져오기
  useEffect(() => {
    try {
      // 직접 토큰을 가져오는 방식으로 변경
      const token = localStorage.getItem('accessToken');
      if (token) {
        setAccessToken(token);
      } else {
        // userState에서 토큰 찾기 시도
        const userStateData = localStorage.getItem('userState');
        if (userStateData) {
          const parsedData = JSON.parse(userStateData);
          if (parsedData.state && parsedData.state.accessToken) {
            setAccessToken(parsedData.state.accessToken);
          }
        }
      }
    } catch (error) {
      console.error('토큰 가져오기 오류:', error);
    }
  }, []);

  // 별점 변경
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  // 이미지 등록
  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages);
  };

  // 리뷰 제출 핸들러
  const handleSubmit = async () => {
    if (rating === 0) {
      console.warn('별점을 선택해주세요.');
      return;
    }

    if (textArea.trim() === '') {
      console.warn('리뷰 내용을 입력해주세요.');
      return;
    }

    if (!accessToken) {
      console.error('인증 토큰이 없습니다. 로그인이 필요합니다.');
      return;
    }

    if (!_id) {
      console.error('스튜디오 ID가 없습니다.');
      return;
    }

    setIsSubmitting(true);

    try {
      // FormData 객체 생성
      const formData = new FormData();

      // 이미지 파일 추가
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          try {
            const response = await fetch(images[i]);
            const blob = await response.blob();
            formData.append('multipartFiles', blob, `image${i}.jpg`);
          } catch (error) {
            console.error(`이미지 ${i} 처리 중 오류 발생:`, error);
          }
        }
      }

      // 텍스트 데이터 추가
      formData.append('content', textArea);
      formData.append('rating', rating.toString());
      formData.append('studioId', _id);
      formData.append('menuId', '0');
      formData.append('additionalOptionIds', '[]');

      // API 요청
      const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/review/file`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP 오류! 상태: ${response.status}, 응답: ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('리뷰 등록 성공:', data);
      navigate(`/studio/${_id}/review`);
    } catch (error) {
      console.error('리뷰 제출 오류:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      css={css`
        width: 50%;
        margin: 0 auto;
        margin-bottom: 3rem;

        @media (max-width: 768px) {
          width: 100%;
        }
      `}
    >
      <Header title="리뷰 작성하기" />
      <div>
        <section>
          <h2
            css={css`
              ${TypoTitleXsM}
              margin: 1rem 0rem;
            `}
          >
            촬영 어떠셨나요?
          </h2>
          <ReservationCard data={null} />

          <StarInput onRatingChange={handleRatingChange} />
        </section>

        <section>
          <h3
            css={css`
              ${TypoTitleXsM}
              margin-top: 1.6rem;
              margin-bottom: 1.6rem;
            `}
          >
            사진 첨부
          </h3>
          <div>
            <ImageUploadPreview maxImages={5} onImagesChange={handleImagesChange} />
          </div>
        </section>

        <section>
          <h4
            css={css`
              ${TypoTitleXsM}
              margin-top: 1.6rem;
            `}
          >
            리뷰 작성
          </h4>
          <div
            css={css`
              width: 100%;
              margin-top: 1.5rem;
              margin-bottom: 5rem;
            `}
          >
            <TextArea
              placeholder="리뷰를 작성해주세요."
              setTextArea={setTextArea}
              minHeight="15.6rem"
              maxLength={1000}
            />
          </div>
        </section>
      </div>

      <Button
        type="submit"
        text="등록하기"
        size="large"
        variant="black"
        disabled={isSubmitting || rating === 0 || textArea.trim() === '' || !accessToken}
        onClick={handleSubmit}
      />
    </main>
  );
};

export default StudioReviewWritePage;
