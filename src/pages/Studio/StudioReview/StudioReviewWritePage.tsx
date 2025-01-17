import { useParams } from 'react-router-dom';

const StudioReviewWritePage = () => {
  const { _id } = useParams();

  return <div>{_id}</div>;
};

export default StudioReviewWritePage;
