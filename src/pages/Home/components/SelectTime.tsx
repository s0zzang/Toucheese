/** @jsxImportSource @emotion/react */

import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import { useSelectTimeStore } from '@store/useSelectTime';
import { TypoCapSmR } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect } from 'react';
import { useState } from 'react';

const SelectTime = () => {
  const times = [
    { text: '오전 9:00', value: 'T09:00:00' },
    { text: '오전 10:00', value: 'T10:00:00' },
    { text: '오전 11:00', value: 'T11:00:00' },
    { text: '오후 12:00', value: 'T12:00:00' },
    { text: '오후 13:00', value: 'T13:00:00' },
    { text: '오후 14:00', value: 'T14:00:00' },
    { text: '오후 15:00', value: 'T15:00:00' },
    { text: '오후 16:00', value: 'T16:00:00' },
    { text: '오후 17:00', value: 'T17:00:00' },
    { text: '오후 18:00', value: 'T18:00:00' },
  ];
  const { time, setTime } = useSelectTimeStore();
  const [clickedBtn, setClickedBtn] = useState({ value: '', currentTime: '', nextTime: '' });

  const handleTImeClick = (text: string, value: string) => {
    const currentTime = text.split(':')[0];
    const nextIdx = times.findIndex((time) => time.text === text) + 1;
    const nextTime = times.length === nextIdx ? '' : times[nextIdx].text.split(':')[0];
    setTime(value);
    setClickedBtn(() => ({ value, currentTime, nextTime }));
  };

  useEffect(() => {
    if (time === '') setClickedBtn(() => ({ value: '', currentTime: '', nextTime: '' }));
  }, [time]);

  return (
    <>
      <SelectTimeStyle>
        {times.map(({ text, value }) => (
          <Button key={value} text={text} variant="white" size="small" width="fit" active={clickedBtn.value === value} onClick={() => handleTImeClick(text, value)} />
        ))}
      </SelectTimeStyle>

      <InfoStyle>
        <p css={TypoCapSmR}>
          {clickedBtn.currentTime
            ? `${clickedBtn.currentTime}시부터 ${clickedBtn.nextTime && `${clickedBtn.nextTime}시 사이에`}  이용할 수 있는 스튜디오가 표시됩니다.`
            : '원하는 시간대가 있다면 선택해주세요.'}
        </p>
      </InfoStyle>
    </>
  );
};

export default SelectTime;

const SelectTimeStyle = styled.div`
  display: flex;
  gap: 0.4rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-top: 2rem;
  border-top: 1px solid ${variables.colors.gray300};

  button {
    flex-shrink: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const InfoStyle = styled.div`
  margin-top: 0.8rem;
  color: ${variables.colors.gray700};
`;
