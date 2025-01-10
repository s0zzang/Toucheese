/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from './Variables';

const GlobalStyles = css`
  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    src: url('../assets/fonts/PretendardVariable.woff2') format('woff2');
  }

  :root {
    font-size: 10px; /* 1rem = 10px */
    min-width: 320px;
    min-height: 100svh;
    background: ${variables.colors.white};
  }

  body {
    margin: unset;
    color: ${variables.colors.black};
    font-family: 'Pretendard', sans-serif; /* Pretendard 폰트 적용 */
    font-size: ${variables.size.medium};
    padding: 4rem ${variables.layoutPadding} calc(4rem + ${variables.headerHeight});
  }

  html,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: unset;
    padding: unset;
    border: 0;
    font-family: 'Pretendard', sans-serif; /* Pretendard 폰트 적용 */
    font-size: inherit;
    font-weight: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
    letter-spacing: -0.02em;
    line-height: 1.4;
    word-break: keep-all;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  ol,
  ul,
  li {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
  }

  strong {
    font-weight: bold;
  }

  button {
    all: unset;
    cursor: pointer;
  }

  img {
    max-width: 100%;
  }

  label {
    cursor: pointer;
  }

  /* input, select, textarea style */
  select {
    color: inherit;
    appearance: none;
    padding-right: 3.2rem;
  }

  textarea {
    all: unset;
  }

  select,
  input,
  textarea {
    font-family: 'Pretendard', sans-serif; /* Pretendard 폰트 적용 */
    letter-spacing: -0.02em;
    box-sizing: border-box;
  }

  textarea {
    width: 100%;
    font-size: ${variables.size.medium};
    box-sizing: border-box;
    overflow-y: auto;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    padding: unset;
  }

  input[type='text'],
  input[type='search'] {
    height: 4rem;
    width: 100%;
    font-size: ${variables.size.medium};
    text-indent: 0.7em;
    border-radius: ${variables.borderRadius};
    border: 1px solid ${variables.colors.gray400};
    outline: 1px solid transparent;
  }

  input[type='text']::placeholder,
  input[type='email']::placeholder,
  input[type='password']::placeholder,
  input[type='tel']::placeholder {
    color: ${variables.colors.gray500};
    font-family: unset;
  }

  input:focus,
  input[type='email']:focus,
  input[type='password']:focus,
  input[type='tel']:focus {
  }

  select:focus-visible {
    border-color: ${variables.colors.primary};
    outline: 1px solid ${variables.colors.primary};
  }

  input[type='checkbox'],
  input[type='radio'] {
    all: unset;
    display: inline-block;
    cursor: pointer;
    position: relative;
    vertical-align: text-top;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    margin-right: 0.5em;
    box-sizing: border-box;
  }

  @media (max-width: 350px) {
    :root {
      font-size: 9px;
    }
  }

  @media (min-width: 500px) and (max-width: 767px) {
    :root {
      font-size: 11px;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    :root {
      font-size: 12px;
    }
  }

  @media (max-width: 1023px) {
    :root {
      width: 100%;
      overflow-x: clip;
    }
  }

  /* PC */
  @media (min-width: 1024px) and (max-width: 1439px) {
    :root {
      font-size: 9px;
    }
  }
`;

export default GlobalStyles;
