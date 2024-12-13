import { useParams } from 'react-router-dom';

const StudioPortfolio = () => {
  const { _id } = useParams();
  return <>{_id} 스튜디오 포트폴리오</>;
};

export default StudioPortfolio;
