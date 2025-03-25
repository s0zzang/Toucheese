import useReservationStore from '@store/useReservationStore';
import {
  changeformatDateForUi,
  convertToDateFormat,
  today,
  useSelectDateStore,
} from '@store/useSelectDateStore';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import CompleteMessage from './components/CompleteMessage';
import { useLocation, useSearchParams } from 'react-router-dom';

const ReservationComplete = () => {
  const {
    studioName: studio,
    menuName: reservedMenu,
    options,
    clearReservationInfo,
  } = useReservationStore();
  const { date, setDate } = useSelectDateStore();
  const { time, setTime } = useSelectTimeStore();

  const [searchParams] = useSearchParams();
  const reservationIdParam = searchParams.get('reservationId');
  const reservationId = reservationIdParam ? Number(reservationIdParam) : 0;

  const reservationData = {
    id: reservationId,
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

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const resultCode = query.get('resultCode');

  if (resultCode === 'UserCancel') {
    window.history.go(-2);
    sessionStorage.setItem('skipLoading', 'true');
    return null;
  }

  return (
    <CompleteMessage type="reserved" data={reservationData} resetInfo={resetReservationInfo} />
  );
};

export default ReservationComplete;
