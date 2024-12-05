import StudioList from '@components/Studio/StudioList';
import { useSearchParams } from 'react-router-dom';
import useModal from '@hooks/useModal';
import LocalDateSelectionModal from './LocalDateSelectionModal';

const Home = () => {
  const [searchParams] = useSearchParams();
  const modal = useModal();


  return (
    <section>
      <button onClick={() => modal.open()}>지역 날짜 선택 모달 열기</button>
      <LocalDateSelectionModal modalId={1} />
      
      hello 여기는 홈입니다!
      <StudioList />
    </section>
  );
};

export default Home;
