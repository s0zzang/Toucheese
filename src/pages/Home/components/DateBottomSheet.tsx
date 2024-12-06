import Button from '@components/Button/Button';
import Calendar from '@components/Calendar/Calendar';
import styled from '@emotion/styled';
import SelectTime from './SelectTime';
import { convertToDateFormat, useSelectDateStore } from '@store/useSelectDate';
import { useSelectTimeStore } from '@store/useSelectTime';

const DateBottomSheet = () => {
  const today = new Date();
  const { time, setTime } = useSelectTimeStore();
  const { date, setDate } = useSelectDateStore();

  const handleReset = () => {
    setDate(convertToDateFormat(today));
    setTime('');
  };

  const handleSubmit = () => {
    console.log(date, time);
  };

  return (
    <>
      <Calendar />
      <SelectTime />
      <ButtonBoxStyle>
        <Button text="초기화" width="fit" variant="gray" onClick={handleReset} />
        <Button text="적용하기" variant="black" onClick={handleSubmit} />
      </ButtonBoxStyle>
    </>
  );
};

export default DateBottomSheet;

const ButtonBoxStyle = styled.div`
  margin-top: 3.2rem;
  display: flex;
  gap: 0.8rem;
`;
