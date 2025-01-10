/** @jsxImportSource @emotion/react */

import Button from '@components/Button/Button';
import { css } from '@emotion/react';
import { useSelectTimeStore } from '@store/useSelectTime';
import { Hidden, TypoBodyMdM, TypoBodySmR } from '@styles/Common';
import variables from '@styles/Variables';
import { useMemo } from 'react';

interface ITimeProp {
  type: 'filter' | 'reservation';
}

const SelectTime = ({ type }: ITimeProp) => {
  const { time: selectedTime, setTime } = useSelectTimeStore();
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
  const morningTimes = useMemo(() => times.filter((time) => time <= '11:00'), [times]);
  const afternoonTimes = useMemo(() => times.filter((time) => time > '11:00'), [times]);

  const handleTImeClick = (value: string) => {
    if (type === 'filter') setTime(value, 'filter');
    if (type === 'reservation') setTime(value, 'reservation');
  };

  return (
    <>
      <section css={SelectTimeStyle}>
        <h2 css={Hidden}>예약 가능한 날짜</h2>

        <article>
          <h3 css={timeZoneTitle}>오전</h3>
          <ul>
            {morningTimes.map((time) => (
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
        </article>

        <article css={timeZone}>
          <h3 css={timeZoneTitle}>오후</h3>
          <ul>
            {afternoonTimes.map((time) => (
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
        </article>

        {type === 'filter' && (
          <>
            <p css={infoText}>중복 선택이 가능합니다.</p>
            <p css={infoText}>선택하지 않으면 전체 시간이 조회됩니다.</p>
          </>
        )}

        <h3 css={Hidden}>
          선택된 시간: <span className="selected">{[...selectedTime].join(',')}</span>
        </h3>
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

const timeZoneTitle = css`
  ${TypoBodyMdM}
  margin-bottom: 1rem;
`;

const timeZone = css`
  margin-top: 2rem;
`;

const infoText = css`
  margin-top: 0.8rem;
  padding-left: 2rem;
  ${TypoBodySmR}
  background: url(/img/icon-info-gray600.svg) no-repeat center left;

  &:first-of-type {
    margin-top: 2rem;
  }
`;
