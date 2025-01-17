import useModal from '@hooks/useModal';
import { useParams } from 'react-router-dom';
import CancelModal from './components/CancelModal';

const ReservationDetail = () => {
  const { _id } = useParams();
  const cancelReasonModal = useModal(1);

  return (
    <>
      {_id} 예약 상세
      <button
        onClick={() => {
          cancelReasonModal.open();
        }}
      >
        취소하기
      </button>
      <CancelModal />
    </>
  );
};

export default ReservationDetail;
