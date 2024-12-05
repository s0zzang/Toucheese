import StudioList from '@components/Studio/StudioList';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [searchParams] = useSearchParams();

  return (
    <section>
      hello 여기는 홈입니다!
      <StudioList />
    </section>
  );
};

export default Home;
