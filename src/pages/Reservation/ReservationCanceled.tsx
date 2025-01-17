import { changeformatDateForUi, convertToDateFormat, today } from '@store/useSelectDateStore';
import CompleteMessage from './components/CompleteMessage';

const ReservationCanceled = () => {
  // 임시 데이터
  const date = convertToDateFormat(today);
  const time = ['13:00'];

  const reservationData = {
    id: 1,
    studio: '그믐달 스튜디오',
    reservedDateTime: changeformatDateForUi({ date, time }),
    reservedMenu: '프로필 A 반신 촬영',
    options: [
      { option_id: 1, optionPrice: 5000, optionName: '전체 컷 원본 파일' },
      { option_id: 2, optionPrice: 5000, optionName: '전체 컷 원본 파일' },
      { option_id: 3, optionPrice: 5000, optionName: '옵션 선택 1' },
      { option_id: 4, optionPrice: 5000, optionName: '옵션 선택 2' },
      { option_id: 5, optionPrice: 5000, optionName: '옵션 선택 3' },
    ],
  };

  return <CompleteMessage type="canceled" data={reservationData} resetInfo={() => {}} />;
};

export default ReservationCanceled;
