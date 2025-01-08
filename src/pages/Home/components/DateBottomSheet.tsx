import Calendar from '@components/Calendar/Calendar';
import { DividerStyle } from '@styles/Common';
import SelectTime from './SelectTime';
import { useSelectTimeStore } from '@store/useSelectTime';
import { convertToDateFormat, today, useSelectDateStore } from '@store/useSelectDate';
import useModal from '@hooks/useModal';
import Modal from '@components/Modal/Modal';

const DateBottomSheet = () => {
  const dateTimeModal = useModal(2);
  const { setTime } = useSelectTimeStore();
  const { setDate } = useSelectDateStore();

  const dateTimeButtons = [
    {
      text: '초기화',
      event: () => {
        setDate(convertToDateFormat(today));
        setTime('', 'filter');
      },
      variant: 'gray' as 'gray',
      width: 'fit' as 'fit',
    },
    {
      text: '적용하기',
      event: () => dateTimeModal.close(),
    },
  ];
  return (
    <Modal type="fullscreen" modalId={2} buttons={dateTimeButtons}>
      <>
        <Calendar style={DividerStyle} />
        <SelectTime type="filter" />
      </>
    </Modal>
  );
};

export default DateBottomSheet;
