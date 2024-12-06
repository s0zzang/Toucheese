import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/Button/Button';
import styled from '@emotion/styled';

//TODO - testcode 작성해야함
/** 필터링 시 매장 서비스 제공 여부를 선택하는 컴포넌트 */

const ServiceAvailability = () => {
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);
  const navigate = useNavigate();

  /** 버튼 클릭 시 선택된 버튼의 인덱스를 상태에 추가하거나 제거하는 함수 */
  const handleButtonClick = (index: number) => {
    setSelectedButtons((prev) => {
      const newSelected = prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index];
      return newSelected; // 선택된 버튼 목록 업데이트
    });
  };

  /** "적용하기" 버튼 클릭 시 선택된 버튼의 제목을 쿼리 파라미터로 변환하여 네비게이션하는 함수 */
  const handleApplyClick = () => {
    const queryParams = selectedButtons.map((i) => `${getButtonTitle(i)}`).join('%');
    navigate(`options=${queryParams}`); // 쿼리 파라미터를 포함한 URL로 이동
  };

  // 인덱스에 해당하는 버튼의 제목을 반환하는 함수
  const getButtonTitle = (index: number) => {
    const titles = ['보정', '원본', '주차', '헤메코', '정장대여', '탈의실', '파우더룸'];
    return titles[index]; // 제목 배열에서 인덱스에 해당하는 제목 반환
  };

  return (
    <>
      <ServiceAvailabilityContainerStyle>
        <Button
          icon={<img src="img/icon-photo-edit.svg" alt="1:1보정" />}
          iconSizeWidth="2.4rem"
          iconSizeHeight="2.4rem"
          iconPosition="right"
          size="medium"
          text={`1:1 보정`}
          width="fit"
          variant="white"
          disabled={selectedButtons.includes(0)}
          onClick={() => handleButtonClick(0)}
          type="button"
        />
        <Button
          icon={<img src="img/icon-original-file.svg" alt="원본 파일 제공" />}
          iconSizeWidth="2.4rem"
          iconSizeHeight="2.4rem"
          iconPosition="right"
          size="medium"
          text={`원본파일 제공`}
          width="fit"
          variant="white"
          disabled={selectedButtons.includes(1)}
          onClick={() => handleButtonClick(1)}
          type="button"
        />
        <Button
          icon={<img src="img/icon-parking.svg" alt="주차" />}
          iconSizeWidth="2.4rem"
          iconSizeHeight="2.4rem"
          iconPosition="right"
          size="medium"
          text={`주차`}
          width="fit"
          variant="white"
          disabled={selectedButtons.includes(2)}
          onClick={() => handleButtonClick(2)}
          type="button"
        />
        <Button
          icon={<img src="img/icon-makeup.svg" alt="헤메코" />}
          iconSizeWidth="2.4rem"
          iconSizeHeight="2.4rem"
          iconPosition="right"
          size="medium"
          text={`헤어, 메이크업 수정`}
          width="fit"
          variant="white"
          disabled={selectedButtons.includes(3)}
          onClick={() => handleButtonClick(3)}
          type="button"
        />
        <Button
          icon={<img src="img/icon-suit.svg" alt="정장대여" />}
          iconSizeWidth="2.4rem"
          iconSizeHeight="2.4rem"
          iconPosition="right"
          size="medium"
          text={`정장 대여`}
          width="fit"
          variant="white"
          disabled={selectedButtons.includes(4)}
          onClick={() => handleButtonClick(4)}
          type="button"
        />
        <Button
          icon={<img src="img/icon-room.svg" alt="탈의실" />}
          iconSizeWidth="2.4rem"
          iconSizeHeight="2.4rem"
          iconPosition="right"
          size="medium"
          text={`탈의실`}
          width="fit"
          variant="white"
          disabled={selectedButtons.includes(5)}
          onClick={() => handleButtonClick(5)}
          type="button"
        />
        <Button
          icon={<img src="img/icon-powder.svg" alt="파우더룸" />}
          iconSizeWidth="2.4rem"
          iconSizeHeight="2.4rem"
          iconPosition="right"
          size="medium"
          text={`파우더룸`}
          width="fit"
          variant="white"
          disabled={selectedButtons.includes(6)}
          onClick={() => handleButtonClick(6)}
          type="button"
        />
      </ServiceAvailabilityContainerStyle>
      <ButtonWrapperStyle>
        <Button size="large" disabled={false} text={`초기화`} width="fit" variant="gray" onClick={handleApplyClick} type="button" />
        <Button size="large" disabled={false} text={`적용하기`} width="max" variant="black" onClick={handleApplyClick} type="button" />
      </ButtonWrapperStyle>
    </>
  );
};

const ServiceAvailabilityContainerStyle = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;
const ButtonWrapperStyle = styled.div`
  margin-top: 3.2rem;
  width: 100%;
  display: flex;
  gap: 0.8rem;
`;

export default ServiceAvailability;
