import { useParams } from 'react-router-dom';

const StudioMain = () => {
  const { _id } = useParams();
  return <>{_id} 스튜디오</>;
};

export default StudioMain;
