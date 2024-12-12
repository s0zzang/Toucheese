import { useParams } from 'react-router-dom';

const StudioMenu = () => {
  const { _id } = useParams();
  return <>{_id} 스튜디오 메뉴</>;
};

export default StudioMenu;
