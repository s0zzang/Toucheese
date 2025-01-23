/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { TypoCapSmR } from '@styles/Common';
import variables from '@styles/Variables';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  TextareaHTMLAttributes,
  useRef,
  useState,
} from 'react';

interface ITextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  maxLength?: number;
  minHeight?: string;
  setTextArea: Dispatch<SetStateAction<string>>;
}

const TextArea = ({
  placeholder,
  maxLength = 100,
  minHeight = '7.6rem',
  setTextArea,
  ...rest
}: ITextArea) => {
  const [currentLength, setCurrentLength] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(e.target.value);
    setCurrentLength(e.target.value.length);

    // 입력시 높이 자동 조절
    if (!textareaRef.current) return;
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  return (
    <div css={textareaBox(minHeight)}>
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => handleChange(e)}
        {...rest}
      />
      <span css={showLength}>
        {currentLength}/{maxLength}
      </span>
    </div>
  );
};

export default TextArea;

const textareaBox = (minHeight: string) => css`
  position: relative;

  textarea {
    vertical-align: top;
    scrollbar-width: none;
    min-height: ${minHeight};

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const showLength = css`
  position: absolute;
  color: ${variables.colors.gray500};
  right: 1.2rem;
  bottom: 1.2rem;
  ${TypoCapSmR}
`;
