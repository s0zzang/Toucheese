/** @jsxImportSource @emotion/react */
import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import Modal from '@components/Modal/Modal';
import { css } from '@emotion/react';
import { useModalStore } from '@store/useModalStore';
import { useUserStore } from '@store/useUserStore';
import { TypoBodyMdR, TypoTitleXsB, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Profile = () => {
  const data = localStorage.getItem('userState');
  // const openToast = useToast();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleProfileEditPage = () => {
    navigate('/user/profile/edit');
  };

  const handlePasswordEditPage = () => {
    navigate('/user/profile/passwordConfirm');
  };

  const logout = useUserStore((state) => state.resetUser);
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const modals = useModalStore((state) => state.modals);
  const setOpen = useModalStore((state) => state.setOpen);

  const modalId = 1;

  const openModal = () => {
    setOpen(modalId, true);
  };

  const closeModal = () => {
    setOpen(modalId, false);
  };

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      openModal();
    }
  }, [searchParams]);

  return (
    <>
      {/* 모달 렌더링 */}
      {modals[modalId] && (
        <div className="modal_Test">
          <Modal type="default" title="개인정보가 성공적으로 변경되었어요" withBtn={false}>
            <Button
              text="확인"
              size="medium"
              width="fit"
              type="button"
              variant="black"
              fixed={false}
              style={ButtonStyle}
              onClick={closeModal}
            />
          </Modal>
        </div>
      )}

      <div css={headerStyle}>
        <BackButton />
        <h1>내정보 관리</h1>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 4rem;
        `}
      >
        {/* 개인정보 */}
        <div>
          <div css={infoTitleStyle}>
            <p>개인정보</p>
            <Button
              text="변경하기"
              size="small"
              width="fit"
              variant="white"
              onClick={handleProfileEditPage}
              type="button"
            />
          </div>

          <hr
            css={css`
              border: none;
              border-bottom: 0.1rem solid ${variables.colors.gray300};
              margin: 0.4rem;
            `}
          />

          <dl css={infoDataBoxStyle}>
            <div>
              <dt>이름</dt>
              <dd>{data ? JSON.parse(data).state.username : '이름 없음'}</dd>
            </div>
            <div>
              <dt>휴대폰 번호</dt>
              <dd>{data ? JSON.parse(data).state.phone : '연락처 없음'}</dd>
            </div>
          </dl>
        </div>

        <div>
          <div css={infoTitleStyle}>
            <p>계정정보</p>
            {/* 이메일 회원에게만 버튼 노출 */}

            {data && JSON.parse(data).state.registration === 'EMAIL' ? (
              <Button
                type="button"
                text="비밀번호 변경하기"
                size="small"
                width="fit"
                variant="white"
                onClick={handlePasswordEditPage}
              />
            ) : (
              ''
            )}
          </div>

          <hr
            css={css`
              border: none;
              border-bottom: 0.1rem solid ${variables.colors.gray300};
              margin: 0.4rem;
            `}
          />

          <dl css={infoDataBoxStyle}>
            <div>
              <dt>아이디(이메일)</dt>
              <dd>{data ? JSON.parse(data).state.email : '이메일(아이디) 없음'}</dd>
            </div>
            <div>
              <dt>로그인 방식</dt>
              <dd>
                {data && JSON.parse(data).state.registration === 'EMAIL'
                  ? 'Email'
                  : data && `${JSON.parse(data).state.registration}`}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div css={accoutStyle}>
        <button type="button" onClick={handleLogout}>
          로그아웃
        </button>
        <li>|</li>
        <button type="button">회원 탈퇴</button>
      </div>
    </>
  );
};

const headerStyle = css`
  display: flex;
  margin-bottom: 2rem;

  h1 {
    ${TypoTitleXsM}
    margin-left: 0.8rem;
  }
`;

const infoTitleStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;

  p {
    ${TypoTitleXsB}
  }
`;

const infoDataBoxStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  padding: 1rem 0;

  div {
    display: flex;
    justify-content: space-between;
    ${TypoBodyMdR}

    dt {
      color: ${variables.colors.gray800};
    }
  }
`;

const accoutStyle = css`
  display: flex;
  gap: 1rem;
  justify-content: center;
  text-align: center;
  ${TypoBodyMdR}
  color: ${variables.colors.gray600};
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
`;

const ButtonStyle = css`
  padding: 0 4.6rem;
  margin: auto;
  margin-top: 2.8rem;
`;

export default Profile;
