/** @jsxImportSource @emotion/react */

import BottomSheet from '@components/BottomSheet/BottomSheet';
import Modal from '@components/Modal/Modal';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import variables from '@styles/Variables';
import { useState } from 'react';
import DateBottomSheet from './DateBottomSheet';
import { useNavigate } from 'react-router-dom';
import useBottomSheetState from '@store/useBottomSheetStateStore';

import LocationBottomSheet from './LocationBottmSheet';

const LocalDateSelectionModal = ({ modalId }: { modalId: number }) => {
  const [selectedDate, setSelectedDate] = useState({ date: '', time: '' });
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const { openBottomSheet } = useBottomSheetState();
  const navigate = useNavigate();

  const modal = useModal(modalId);
  const buttons = [
    {
      text: '적용하기',
      event: () => {
        setParams();
        modal.close();
      },
    },
  ];

  const setParams = () => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('requestedDateTime', `${selectedDate.date}${selectedDate.time}`);
    currentParams.set('requestedLocation', `${selectedDate.date}`);
    navigate(`?${currentParams.toString()}`);
  };

  const changeformatDateForUi = ({ date, time }: { date: string; time: string }) => {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const [year, month, day] = date.split('-');
    const dayOfWeek = week[new Date(date).getDay()];

    // UI를 위한 포맷 변경
    const selectedDateForUi = `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
    const selectedTimeForUi = `${time.split(':')[0].slice(1)}시`;

    return `${selectedDateForUi} ${selectedTimeForUi === '00시' ? '' : selectedTimeForUi}`;
  };

  const handleOpenLocation = () => openBottomSheet(<LocationBottomSheet setSelectedLocation={setSelectedLocation} initialSelectedLocation={selectedLocation} />, '지역 선택');
  const handleOpenDate = () => openBottomSheet(<DateBottomSheet setSelectedDate={setSelectedDate} />, '');

  return (
    <>
      <Modal title="지역, 날짜 선택" buttons={buttons} size="full">
        <>
          <InputBoxStyle>
            <button type="button" onClick={handleOpenLocation}>
              {selectedLocation ? selectedLocation : '지역 선택'}
            </button>
            <button type="button" onClick={handleOpenDate}>
              {selectedDate.date ? changeformatDateForUi(selectedDate) : '예약 날짜 선택'}
            </button>
          </InputBoxStyle>
        </>
      </Modal>
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
