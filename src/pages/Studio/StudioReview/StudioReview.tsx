import { useParams } from 'react-router-dom';

const StudioReview = () => {
  const { _id } = useParams();
  return <>{_id} 스튜디오 리뷰</>;
};

export default StudioReview;
