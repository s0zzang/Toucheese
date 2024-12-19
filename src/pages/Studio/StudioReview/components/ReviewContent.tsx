/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { css } from '@emotion/react';
import { useRef, useEffect, useState } from 'react';

interface ReviewContentProps {
  content: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ReviewContent = ({ content, isOpen, setIsOpen }: ReviewContentProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTextOverflow, setIsTextOverflow] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight);
      const height = textRef.current.scrollHeight;
      setIsTextOverflow(height > lineHeight * 3);
    }
  }, [content]);

  return (
    <ReviewContentStyle>
      <ContentText ref={textRef} isOpen={isOpen}>
        {content}
      </ContentText>
      {isTextOverflow && <MoreButton onClick={() => setIsOpen(!isOpen)}>{isOpen ? '접기' : '더보기'}</MoreButton>}
    </ReviewContentStyle>
  );
};

export default ReviewContent;

const ReviewContentStyle = styled.div`
  position: relative;
  margin: 1.6rem 0;
`;

const ContentText = styled.p<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    !isOpen &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
  line-height: 1.5;
  color: ${variables.colors.gray900};
`;

const MoreButton = styled.button`
  color: ${variables.colors.gray600};
  margin-top: 0.8rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;
