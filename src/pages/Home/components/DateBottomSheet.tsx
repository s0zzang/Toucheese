import Calendar from '@components/Calendar/Calendar';
import { DividerStyle } from '@styles/Common';
import SelectTime from './SelectTime';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import { convertToDateFormat, today, useSelectDateStore } from '@store/useSelectDateStore';
import useModal from '@hooks/useModal';
import Modal from '@components/Modal/Modal';
import { Dispatch, SetStateAction } from 'react';

const DateBottomSheet = ({
  setIsSelectedDate,
}: {
  setIsSelectedDate: Dispatch<SetStateAction<boolean>>;
}) => {
  const dateTimeModal = useModal(2);
  const { setTime } = useSelectTimeStore();
  const { setDate } = useSelectDateStore();

  const dateTimeButtons = [
    {
      text: '초기화',
      event: () => {
        setDate(convertToDateFormat(today));
        setTime('reset', 'filter');
      },
      variant: 'gray' as 'gray',
      width: 'fit' as 'fit',
    },
    {
      text: '적용하기',
      event: () => {
        setIsSelectedDate(true);
        dateTimeModal.close();
      },
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
