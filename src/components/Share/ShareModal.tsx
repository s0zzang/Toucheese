/** @jsxImportSource @emotion/react */

import Modal from '@components/Modal/Modal';
import ShareOptions from './ShareOptions';
import { ShareProps } from './ShareButton';
import { css } from '@emotion/react';

const ShareModal = ({ modalId, title, description, imageUrl, webUrl }: ShareProps) => {
  return (
    <Modal
      modalId={modalId}
      type="fullscreen"
      title="공유 옵션 선택"
      withBtn={false}
      isCloseBtn={true}
      additionalStyle={shareModalWr}
    >
      <ShareOptions title={title} description={description} imageUrl={imageUrl} webUrl={webUrl} />
    </Modal>
  );
};

export default ShareModal;

const shareModalWr = css`
  min-height: auto !important;
  width: 40rem !important;
`;
