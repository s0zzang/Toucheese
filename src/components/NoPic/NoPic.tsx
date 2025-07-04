/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';

const NoPic = ({ type }: { type: number }) => {
  return (
    <img css={imgStyle(type)} src={`/img/img-nopic${type}.svg`} alt={`이미지 ${type}개 준비 중`} />
  );
};

export default NoPic;

const imgStyle = (type: number) => css`
  width: calc((100% - 12px) / 7 * ${type} + (${type - 1} * 2px));
  aspect-ratio: ((892 / 7) * ${type} + (${type - 1} * 2)) / 160;
  object-fit: cover;
`;
