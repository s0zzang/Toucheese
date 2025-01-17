/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import { css } from '@emotion/react';
import { TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { useParams } from 'react-router-dom';
import StarInput from './components/StarInput';

const StudioReviewWritePage = () => {
  const { _id } = useParams();

  return (
    <div>
      <Header title="리뷰 작성하기" />
      <h1
        css={css`
          ${TypoTitleXsM}
          margin-top: 1.6rem;
        `}
      >
        촬영 어떠셨나요?
      </h1>
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
      <StarInput />
    </div>
  );
};

export default StudioReviewWritePage;
