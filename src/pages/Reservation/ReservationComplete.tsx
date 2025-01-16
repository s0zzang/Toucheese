import useReservationStore from '@store/useReservationStore';
import {
  changeformatDateForUi,
  convertToDateFormat,
  today,
  useSelectDateStore,
} from '@store/useSelectDateStore';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import { useNavigate } from 'react-router-dom';
import CompleteMessage from './components/CompleteMessage';

const ReservationComplete = () => {
  const navigate = useNavigate();

  const {
    studioName: studio,
    menuName: reservedMenu,
    options,
    clearReservationInfo,
  } = useReservationStore();
  const { date, setDate } = useSelectDateStore();
  // setTime 추가 예정
  const { time } = useSelectTimeStore();
  console.log(date, time);

  // [임시] 예약 생성 후 response로 id를 전달받아 사용 예정
  const id = 1;

  const reservationData = {
    studio,
    reservedDateTime: changeformatDateForUi({ date, time }),
    reservedMenu,
    options,
  };

  const handleToDetail = () => {
    clearReservationInfo();
    setDate(convertToDateFormat(today));
    // setTime('reset');
    navigate(`/reservation/${id}`);
  };

  const handleToHome = () => {
    clearReservationInfo();
    setDate(convertToDateFormat(today));
    // setTime('reset');
    navigate('/');
  };

  return (
    <CompleteMessage
      type="reserved"
      data={reservationData}
      handleToDetail={handleToDetail}
      handleToHome={handleToHome}
    />
  );
};

export default ReservationComplete;
