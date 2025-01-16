import useReservationStore from '@store/useReservationStore';
import {
  changeformatDateForUi,
  convertToDateFormat,
  today,
  useSelectDateStore,
} from '@store/useSelectDateStore';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import CompleteMessage from './components/CompleteMessage';

const ReservationComplete = () => {
  const {
    studioName: studio,
    menuName: reservedMenu,
    options,
    clearReservationInfo,
  } = useReservationStore();
  const { date, setDate } = useSelectDateStore();
  const { time, setTime } = useSelectTimeStore();

  // [임시] 예약 생성 후 response로 id를 전달받아 사용 예정
  const reservationData = {
    id: 1,
    studio,
    reservedDateTime: changeformatDateForUi({ date, time }),
    reservedMenu,
    options,
  };

  const resetReservationInfo = () => {
    clearReservationInfo();
    setDate(convertToDateFormat(today));
    setTime('reset');
  };

  return (
    <CompleteMessage type="reserved" data={reservationData} resetInfo={resetReservationInfo} />
  );
};

export default ReservationComplete;
