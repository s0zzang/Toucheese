/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useToastStore } from '@store/useToastStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodyMdM } from '@styles/Common';
import variables from '@styles/Variables';
import { createPortal } from 'react-dom';

const Toast = () => {
  const toasts = useToastStore((state) => state.toasts);
  const element = document.getElementById('toast-portal') as HTMLElement;

  // 토스트 메시지가 존재할 때만 'toast-portal'에 추가
  return createPortal(
    toasts.length > 0 && (
      <ToastContainerStyle>
        {toasts.map(({ id, content }) => (
          <ToastStyle key={id} css={TypoBodyMdM}>
            {content}
          </ToastStyle>
        ))}
      </ToastContainerStyle>
    ),
    element,
  );
};

const ToastContainerStyle = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.8rem;

  position: fixed;
  left: ${variables.layoutPadding};
  right: ${variables.layoutPadding};
  bottom: 4.4rem;
  z-index: 9999;

  ${mqMin(breakPoints.pc)} {
    left: unset;
    right: 4rem;
    bottom: 4rem;
    width: 32.8rem;
  }
`;

const ToastStyle = styled.div`
  background-color: ${variables.colors.gray900};
  color: ${variables.colors.white};
  border-radius: ${variables.borderRadius};
  padding: 1.4rem ${variables.layoutPadding};
  box-shadow:
    0 0.4rem 0.8rem rgba(0, 0, 0, 0.15),
    0 1px 3px rgba(0, 0, 0, 0.3);

  animation:
    slideIn 0.3s ease forwards,
    fadeIn 0.3s ease forwards,
    slideOut 0.3s ease forwards 2.7s,
    fadeOut 0.3s ease forwards 2.7s;

  ${mqMin(breakPoints.pc)} {
    width: 100%;
    padding: 1.2rem 1.6rem;
  }

  @keyframes slideIn {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export default Toast;
