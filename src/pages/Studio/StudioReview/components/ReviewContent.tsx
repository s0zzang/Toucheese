import React from 'react';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { TypoCapSmR } from '@styles/Common';

interface ReviewContentProps {
  content: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewContent = ({ content, isOpen, setIsOpen }: ReviewContentProps): JSX.Element => {
  return (
    <ReviewContentWrapper>
      <ContentText isExpanded={isOpen}>{content}</ContentText>
      <MoreButton onClick={() => setIsOpen(!isOpen)}>{isOpen ? '접기' : '더보기'}</MoreButton>
    </ReviewContentWrapper>
  );
};

const ReviewContentWrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;
  margin-top: 0.8rem;
`;

const ContentText = styled.p<{ isExpanded: boolean }>`
  font-size: 1.6rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.isExpanded ? 'none' : '3')};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: ${variables.colors.gray600};
  text-decoration: underline;
  ${TypoCapSmR}
  cursor: pointer;
  margin-top: 0.5rem;
`;

export default ReviewContent;
