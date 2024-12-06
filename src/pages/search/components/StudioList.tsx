/** @jsxImportSource @emotion/react */
import ImageSwiper from '@components/ImageSwiper/ImageSwiper';
import React from 'react';

interface StudioListProps {
  results: {
    name: string;
    description: string;
    images: string[];
  }[];
}

//임시 코드

const StudioList: React.FC<StudioListProps> = ({ results }) => {
  return (
    <div>
      <h3>스튜디오 검색 결과</h3>
      {/*임시*/}
      <ul>
        {results.map((studio, index) => (
          <li key={index}>
            <ImageSwiper images={studio.images} />
            <h4>{studio.name}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudioList;
