import styled from '@emotion/styled';
import StudioItem from './StudioItem';

const StudioList = () => {
  return (
    <UlStyle>
      <StudioItem />
      <StudioItem />
      <StudioItem />
      <StudioItem />
      <StudioItem />
    </UlStyle>
  );
};

const UlStyle = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export default StudioList;
