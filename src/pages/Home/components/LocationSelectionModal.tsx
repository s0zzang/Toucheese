import { TypoTitleSmS } from '@styles/Common';
import styled from '@emotion/styled';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import { useState } from 'react';

type LocationItem = string;

const LocationSelectionModal = ({ setSelectedLocation }: { setSelectedLocation: React.Dispatch<React.SetStateAction<LocationItem | null>> }) => {
  const LocationList: LocationItem[] = ['전체보기', '강남', '서초', '송파', '강서', '마포', '영등포', '강북', '용산', '성동'];
  const { closeBottomSheet } = useBottomSheetState();
  const [selectedIndex, setSelectedIndex] = useState<LocationItem | null>(null);

  const handleClick = (item: string) => {
    setSelectedIndex(item);
    setSelectedLocation(item);
    closeBottomSheet();
  };

  return (
    <LocationBox>
      <ul>
        {LocationList.map((v, i) => (
          <ListItem onClick={() => handleClick(v)} isSelected={selectedIndex === v} key={i}>
            {v}
          </ListItem>
        ))}
      </ul>
    </LocationBox>
  );
};

const LocationBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  ${TypoTitleSmS};
`;

const ListItem = styled.li<{ isSelected: boolean }>`
  cursor: pointer;
  display: block;
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
