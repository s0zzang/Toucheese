/** @jsxImportSource @emotion/react */
import Modal from '@components/Modal/Modal';
// import { css } from '@emotion/react';
import styled from '@emotion/styled';

const DimmedModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Modal type="dimmed" title={`3/20`} withBtn={false}>
        <DimmedModalStyle>{children}</DimmedModalStyle>
      </Modal>
    </>
  );
};

const DimmedModalStyle = styled.div`
  width: 100%;
  display: flex;
`;

// const swiperStyle = css`
//   color: white;
// `;

export default DimmedModal;
