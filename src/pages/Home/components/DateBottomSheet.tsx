import Calendar from '@components/Calendar/Calendar';
import Modal from '@components/Modal/Modal';
import useModal from '@hooks/useModal';
import { useSelectDateStore } from '@store/useSelectDateStore';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import { DividerStyle } from '@styles/Common';
import SelectTime from './SelectTime';

const DateBottomSheet = ({}: {}) => {
  const dateTimeModal = useModal(2);
  const { setTime } = useSelectTimeStore();
  const { setDate } = useSelectDateStore();

  const dateTimeButtons = [
    {
      text: '초기화',
      event: () => {
        setDate('reset');
        setTime('reset', 'filter');
      },
      variant: 'gray' as 'gray',
      width: 'fit' as 'fit',
    },
    {
      text: '적용하기',
      event: () => {
        dateTimeModal.close();
      },
    },
  ];

  return (
    <Modal type="fullscreen" title="날짜, 시간 선택" modalId={2} buttons={dateTimeButtons}>
      <>
        <Calendar />
        <SelectTime type="filter" />
      </>
    </Modal>
  );
};

export default DateBottomSheet;
