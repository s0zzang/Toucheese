/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import { css } from '@emotion/react';
import { DividerStyle, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import StarInput from './components/StarInput';
import Button from '@components/Button/Button';
import ImageUploadPreview from './components/ImageUploadPreview';

/** 리뷰 작성 페이지  */
const StudioReviewWritePage = () => {
  // 별점 변경
  const handleRatingChange = (rating: number) => {
    console.log('선택된 별점:', rating);
  };

  // 이미지 등록
  const handleImagesChange = (images: string[]) => {
    console.log('현재 선택된 이미지들:', images);
  };

  return (
    <main>
      <Header title="리뷰 작성하기" />

      <section>
        <h2
          css={css`
            ${TypoTitleXsM}
            margin-top: 1.6rem;
          `}
        >
          촬영 어떠셨나요?
        </h2>
        <div
          css={css`
            margin-top: 0.8rem;
            width: 100%;
            height: 12.7rem;
            background-color: ${variables.colors.gray100};
            margin-bottom: 1rem;
          `}
        >
          내용1
        </div>
        <StarInput onRatingChange={handleRatingChange} />
      </section>

      <div css={DividerStyle}></div>

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

      <div css={DividerStyle}></div>

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
            height: 15rem;
            background-color: ${variables.colors.gray600};
            margin-top: 1.5rem;
            margin-bottom: 5rem;
          `}
        >
          리뷰 작성 섹션
        </div>
      </section>

      <Button type="submit" text="등록하기" size="large" variant="black" disabled={!true} />
    </main>
  );
};

export default StudioReviewWritePage;
