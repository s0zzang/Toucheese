import { useParams } from 'react-router-dom';

const StudioMenuDetail = () => {
  const { _menuId } = useParams();
  return <>스튜디오 메뉴 {_menuId} 상세</>;
};

export default StudioMenuDetail;
