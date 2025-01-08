/** @jsxImportSource @emotion/react */
import Modal from '@components/Modal/Modal';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import { changeformatDateForUi, useSelectDateStore } from '@store/useSelectDate';
import { useSelectTimeStore } from '@store/useSelectTime';
import variables from '@styles/Variables';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DateBottomSheet from './DateBottomSheet';
import LocationBottomSheet from './LocationBottomSheet';

const LocalDateSelectionModal = ({ modalId }: { modalId: number }) => {
  const { time } = useSelectTimeStore();
  const { date } = useSelectDateStore();

  const [isSelectedDate, setIsSelectedDate] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const { openBottomSheet } = useBottomSheetState();
  const navigate = useNavigate();

  const dateLocationModal = useModal(modalId);
  const dateTimeModal = useModal(2);
  const dateLocationButtons = [
    {
      text: '적용하기',
      event: () => {
        setParams();
        dateLocationModal.close();
      },
    },
  ];

  const setParams = () => {
    const currentParams = new URLSearchParams(window.location.search);
    // currentParams.set('requestedDateTime', `${selectedDate.date}${selectedDate.time}`);
    // currentParams.set('requestedLocation', `${selectedDate.date}`);
    navigate(`?${currentParams.toString()}`);
  };

  const handleOpenLocation = () =>
    openBottomSheet(
      <LocationBottomSheet
        setSelectedLocation={setSelectedLocation}
        initialSelectedLocation={selectedLocation}
      />,
      '지역 선택',
    );
  const handleOpenDate = () => dateTimeModal.open();

  return (
    <>
      <Modal title="지역, 날짜 선택" buttons={dateLocationButtons} type="fullscreen">
        <>
          <InputBoxStyle>
            <button type="button" onClick={handleOpenLocation}>
              {selectedLocation ? selectedLocation : '지역 선택'}
            </button>
            <button type="button" onClick={handleOpenDate}>
              {isSelectedDate ? changeformatDateForUi({ date, time }) : '예약 날짜 선택'}
            </button>
          </InputBoxStyle>
        </>
      </Modal>

      <DateBottomSheet setIsSelectedDate={setIsSelectedDate} />
    </>
  );
};

export default LocalDateSelectionModal;

const InputBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    height: 4.4rem;
    border-radius: 1rem;
    background: ${variables.colors.gray200} url() no-repeat center left 1.4rem / 1.6rem;
    padding-left: 4rem;
    color: ${variables.colors.gray800};
    cursor: pointer;

    &:nth-of-type(1) {
      background-image: url(/img/icon-location.svg);
    }
    &:nth-of-type(2) {
      background-image: url(/img/icon-calendar.svg);
    }
  }
`;
