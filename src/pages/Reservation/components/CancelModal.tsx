/** @jsxImportSource @emotion/react */

import Modal from '@components/Modal/Modal';
import { css } from '@emotion/react';
import useModal from '@hooks/useModal';
import { TypoBodyMdM, TypoTitleSmS, TypoTitleXsR } from '@styles/Common';

const CancelModal = () => {
  const cancelReasonModal = useModal(1);
  const cancelConfirmModal = useModal(2);

  const handleCancel = () => {
    console.log('취소 API 작업');
  };

  const cancelReasonButton = [
    {
      text: '예약 취소하기',
      event: () => {
        cancelConfirmModal.open();
      },
    },
  ];

  const cancelConfirmButton = [
    {
      text: '예약 유지',
      event: () => {
        cancelConfirmModal.close();
        cancelReasonModal.close();
      },
      variant: 'gray' as 'gray',
    },
    {
      text: '예약 취소',
      event: () => {
        handleCancel();
        cancelConfirmModal.close();
        cancelReasonModal.close();
      },
    },
  ];

  return (
    <>
      <Modal type="fullscreen" title="예약취소" buttons={cancelReasonButton}>
        <>
          <section>
            <h3 css={cancelTitle}>
              예약을 취소하는 이유를 알려주세요. <span>(필수)</span>
            </h3>
            <ul css={cancelList}>
              <li>
                <input type="radio" name="cancelReason" id="scheduleChange" value="일정 변경" />
                <label htmlFor="scheduleChange">일정 변경</label>
              </li>
              <li>
                <input type="radio" name="cancelReason" id="rebook" value="다른 옵션으로 재예약" />
                <label htmlFor="rebook">다른 옵션으로 재예약</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="cancelReason"
                  id="useAnotherStudio"
                  value="다른 사진관 이용"
                />
                <label htmlFor="useAnotherStudio">다른 사진관 이용</label>
              </li>
              <li>
                <input type="radio" name="cancelReason" id="changeOfMind" value="단순 변심" />
                <label htmlFor="changeOfMind">단순 변심</label>
              </li>
              <li>
                <input type="radio" name="cancelReason" id="etc" value="기타" />
                <label htmlFor="etc">기타</label>
              </li>
            </ul>
          </section>
          <section css={cancelLayout}>
            <h3 css={cancelTitle}>
              취소 사유 상세 <span>(선택)</span>
            </h3>
            <textarea
              name="cancelReason"
              id="cancelReason"
              placeholder="예약을 취소하는 이유를 구체적으로 알려주세요."
            ></textarea>
          </section>
        </>
      </Modal>

      <Modal
        modalId={2}
        type="default"
        title="정말 예약을 취소하시겠어요?"
        buttons={cancelConfirmButton}
      >
        예약 취소 시 복구할 수 없어요.
      </Modal>
    </>
  );
};

export default CancelModal;

const cancelTitle = css`
  ${TypoTitleSmS}
  padding: 1rem 0 1.6rem;

  span {
    font-weight: normal;
  }
`;

const cancelList = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  li {
    ${TypoTitleXsR}
    ${TypoBodyMdM}
  }
`;

const cancelLayout = css`
  margin-top: 1rem;
`;
