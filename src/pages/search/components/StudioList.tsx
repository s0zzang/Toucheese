/** @jsxImportSource @emotion/react */
import ImageSwiper from '@components/ImageSwiper/ImageSwiper';

interface StudioListProps {
  results: {
    name: string;
    description: string;
    images: string[];
  }[];
}

//임시 코드

const StudioList = ({ results }: StudioListProps) => {
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
