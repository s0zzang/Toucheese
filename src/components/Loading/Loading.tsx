/** @jsxImportSource @emotion/react */

import Lottie from 'react-lottie';
import animationData from '@assets/json/loading.json';
import { css } from '@emotion/react';

interface ILoading {
  size?: 'small' | 'big';
  phrase?: string;
}

const Loading = ({ size = 'small', phrase }: ILoading) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div css={lottieBox(size)}>
      <Lottie options={defaultOptions} width={size === 'big' ? '20rem' : '14rem'} />
      {phrase && <p className="loadingText">{phrase}</p>}
    </div>
  );
};

export default Loading;

const lottieBox = (size: string) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${size === 'small' && 'min-height: 50vh;'}
  ${size === 'big' &&
  `    
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);`}

  .loadingText {
    font-weight: 500;
  }
`;
