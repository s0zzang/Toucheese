/** @jsxImportSource @emotion/react */

import Button from '@components/Button/Button';
import { css } from '@emotion/react';
import { useSelectTimeStore } from '@store/useSelectTime';
import { Hidden } from '@styles/Common';
import variables from '@styles/Variables';

interface ITimeProp {
  type: 'filter' | 'reservation';
}

const SelectTime = ({ type }: ITimeProp) => {
  const times = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];
  const { time: selectedTime, setTime } = useSelectTimeStore();

  const handleTImeClick = (value: string) => {
    if (type === 'filter') setTime(value, 'filter');
    if (type === 'reservation') setTime(value, 'reservation');
  };

  return (
    <>
      <section css={SelectTimeStyle}>
        <h2 css={Hidden}>예약 가능한 날짜</h2>
        <ul>
          {times.map((time) => (
            <li key={time}>
              <Button
                key={time}
                text={time}
                variant="white"
                size="small"
                width="max"
                active={selectedTime.has(time)}
                onClick={() => handleTImeClick(time)}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default SelectTime;

const SelectTimeStyle = css`
  padding-top: 2rem;
  border-top: 1px solid ${variables.colors.gray300};

  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem 0.8rem;

    span {
      display: none;
      &.first {
        display: block;
      }
    }
  }

  button {
    height: 3.6rem;
    font-weight: normal;
  }
`;
