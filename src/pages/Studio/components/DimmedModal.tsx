import Modal from '@components/Modal/Modal';
import styled from '@emotion/styled';

const DimmedModal = () => {
  return (
    <>
      <Modal type="dimmed" title={`3/20`} withBtn={false}>
        <DimmedModalStyle>모달</DimmedModalStyle>
      </Modal>
    </>
  );
};

const DimmedModalStyle = styled.div`
  box-shadow: inset 0 0 10px yellow;
`;

export default DimmedModal;
