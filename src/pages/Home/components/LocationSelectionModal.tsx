import { TypoTitleSmS } from '@styles/Common';
import styled from '@emotion/styled';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import { useEffect, useState } from 'react';
import Button from '@components/Button/Button';

type LocationItem = string;

const LocationSelectionModal = ({
  setSelectedLocation,
  initialSelectedLocation,
}: {
  setSelectedLocation: React.Dispatch<React.SetStateAction<LocationItem | null>>;
  initialSelectedLocation: LocationItem | null;
}) => {
  const LocationItem: LocationItem[] = ['전체보기', '강남', '서초', '송파', '강서', '마포', '영등포', '강북', '용산', '성동'];
  const { closeBottomSheet } = useBottomSheetState();
  const [selectedIndex, setSelectedIndex] = useState<LocationItem | null>(null);

  useEffect(() => {
    setSelectedIndex(initialSelectedLocation);
  }, [initialSelectedLocation]);

  const handleClick = (item: string) => {
    setSelectedIndex(item);
  };

  const handleReset = () => {
    setSelectedIndex('전체보기');
    setSelectedLocation('전체보기');
  };

  const handleApply = () => {
    if (selectedIndex) {
      setSelectedLocation(selectedIndex);
      closeBottomSheet();
    }
  };

  return (
    <>
      <LocationBox>
        <ul>
          {LocationItem.map((v, i) => (
            <ListItem onClick={() => handleClick(v)} isSelected={selectedIndex === v} key={i}>
              {v}
            </ListItem>
          ))}
        </ul>
      </LocationBox>
      <ButtonBox>
        <Button text="초기화" width="fit" variant="gray" onClick={handleReset} />
        <Button text="적용하기" variant="black" onClick={handleApply} />
      </ButtonBox>
    </>
  );
};

const ButtonBox = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const LocationBox = styled.section`
  margin-bottom: 3.2rem;
  ${TypoTitleSmS};

  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      width: 50%;
    }
  }
`;

const ListItem = styled.li<{ isSelected: boolean }>`
  cursor: pointer;
  display: block;
  width: calc(50% - 0.75rem);
  position: relative;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  ${(props) =>
    props.isSelected &&
    `
    &::after {
        content: '';
        position: absolute;
        top: 25%;
        transform: translateX(100%);
        width: 1.5rem;
        height: 1.1rem;
        background-size: contain;
        background-image: url('/img/icon-check.svg');
      }
  `}
`;

export default LocationSelectionModal;
