/** @jsxImportSource @emotion/react */
import Modal from '@components/Modal/Modal';
import styled from '@emotion/styled';

const DimmedModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Modal type="dimmed" withBtn={false}>
        <DimmedModalStyle>{children}</DimmedModalStyle>
      </Modal>
    </>
  );
};

const DimmedModalStyle = styled.div`
  * {
    color: #fff;
  }
`;

export default DimmedModal;
