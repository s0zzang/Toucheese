import { useGetStudios } from '@hooks/useGetStudios';
import { useSearchParams } from 'react-router-dom';
import MasonryList from '@components/Masonry/Masonry';

const StudioPortfolio = () => {
  const [searchParams] = useSearchParams();

  // 포트폴리오 api 개발 전이라 스튜디오 리스트에서 이미지 추출하여 예시 작성
  const { data } = useGetStudios(1, 'filter', searchParams + '');
  const datas = data?.content[12].portfolios;

  return (
    <>
      {datas && (
        <MasonryList>
          {datas.map(({ url, studio, id }) => (
            <img key={`${studio}-${id}`} src={url} alt={`${studio}-${id}`} />
          ))}
        </MasonryList>
      )}
    </>
  );
};

export default StudioPortfolio;
