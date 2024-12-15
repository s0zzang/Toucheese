import { useState } from 'react';
import styled from '@emotion/styled';
import variables from '@styles/Variables';

interface ReviewContentProps {
  content: string;
}

const ReviewContent = ({ content }: ReviewContentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ReviewContentWrapper>
      <ContentText isExpanded={isExpanded}>{content}</ContentText>
      {content.length > 100 && <MoreButton onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? '접기' : '더보기'}</MoreButton>}
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
  font-size: 1.4rem;
  cursor: pointer;
  margin-top: 0.5rem;
`;

export default ReviewContent;
