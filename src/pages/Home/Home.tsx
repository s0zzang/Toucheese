import StudioList from '@components/Studio/StudioList';
import { useSearchParams } from 'react-router-dom';
import useModal from '@hooks/useModal';
import LocalDateSelectionModal from './LocalDateSelectionModal';
import BookingSearchContainer from '@components/BookingSearchContainer/BookingSearchContainer';

const Home = () => {
  const [searchParams] = useSearchParams();
  const modal = useModal();

  return (
    <section>
      <BookingSearchContainer />
      <StudioList />
    </section>
  );
};

export default Home;
