import useModal from '@hooks/useModal';
import LocalDateSelectionModal from './LocalDateSelectionModal';

const Home = () => {
  const modal = useModal();
  return (
    <>
      <button onClick={() => modal.open()}>지역 날짜 선택 모달 열기</button>
      <LocalDateSelectionModal modalId={1} />
    </>
  );
};

export default Home;
