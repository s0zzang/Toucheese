import { useParams } from 'react-router-dom';

const ReservationDetail = () => {
  const { _id } = useParams();

  return <>{_id} 예약 상세</>;
};

export default ReservationDetail;
