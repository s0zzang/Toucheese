// /** @jsxImportSource @emotion/react */
// import styled from '@emotion/styled';
// import variables from '@styles/Variables';
// import { useState } from 'react';

// //NOTE - 호환 이슈가 발생 할 수 있어 남겨놓음 사용 금지
// const PriceRangeInput = () => {
//   const [leftValue, setLeftValue] = useState(1);
//   const [rightValue, setRightValue] = useState(20);

//   const handleLeftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newLeftValue = Number(e.target.value);
//     if (newLeftValue <= rightValue) {
//       setLeftValue(newLeftValue);
//     }
//   };

//   const handleRightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newRightValue = Number(e.target.value);
//     if (newRightValue >= leftValue) {
//       setRightValue(newRightValue);
//     }
//   };

//   return (
//     <RangeWrapper>
//       <ValueDisplay>
//         <ValueDisplaySpanStyle>{leftValue}만원~ </ValueDisplaySpanStyle>
//         <ValueDisplaySpanStyle>{rightValue} 만원 이상</ValueDisplaySpanStyle>
//       </ValueDisplay>

//       <RangeTrack>
//         <RangeHighlight left={(leftValue - 1) * (100 / 19)} right={(20 - rightValue) * (100 / 19)} />
//         <StyledRangeInputLeft type="range" min="1" max="10" value={leftValue} onChange={handleLeftChange} />
//         <StyledRangeInput type="range" min="1" max="20" value={rightValue} onChange={handleRightChange} />
//       </RangeTrack>

//       <RangeDisplay>
//         <RangeDisplaySpanStyle>1만원</RangeDisplaySpanStyle>
//         <RangeDisplaySpanStyle>10만원</RangeDisplaySpanStyle>
//         <RangeDisplaySpanStyle>20만원</RangeDisplaySpanStyle>
//       </RangeDisplay>
//     </RangeWrapper>
//   );
// };

// export default PriceRangeInput;

// const RangeWrapper = styled.div`
//   width: 100%;
//   max-width: 500px;
//   margin: 0 auto;
//   position: relative;
// `;

// const RangeTrack = styled.div`
//   width: 100%;
//   height: 0.8rem;
//   background-color: ${variables.colors.gray200};
//   border-radius: ${variables.borderRadius};
//   position: relative;
// `;

// const RangeHighlight = styled.div<{
//   left: number;
//   right: number;
// }>`
//   position: absolute;
//   height: 0.8rem;
//   background-color: ${variables.colors.primary};
//   border-radius: 4px;
//   left: ${(props) => props.left}%;
//   right: ${(props) => props.right}%;
// `;

// const StyledRangeInputLeft = styled.input`
//   position: absolute;
//   top: -10px;
//   width: 100%;
//   appearance: none;
//   background: transparent;
//   z-index: 10;

//   &::-webkit-slider-thumb {
//     appearance: none;
//     width: 2.8rem;
//     height: 2.8rem;
//     background: #fff8e1;
//     border: 0.2rem solid ${variables.colors.primary};
//     border-radius: 50%;
//     cursor: pointer;
//   }
// `;

// const StyledRangeInput = styled.input`
//   position: absolute;
//   top: -10px;
//   width: 100%;
//   appearance: none;
//   background: transparent;
//   z-index: 10;

//   &::-webkit-slider-thumb {
//     appearance: none;
//     width: 2.8rem;
//     height: 2.8rem;
//     background: #fff8e1;
//     border: 0.2rem solid ${variables.colors.primary};
//     border-radius: 50%;
//     cursor: pointer;
//   }
// `;

// const ValueDisplay = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   margin-bottom: 3rem;
// `;
// const ValueDisplaySpanStyle = styled.span`
//   font-size: ${variables.size.large};
//   font-weight: 600;
// `;

// const RangeDisplay = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 1.6rem;
// `;
// const RangeDisplaySpanStyle = styled.span`
//   font-size: ${variables.size.medium};
//   color: ${variables.colors.gray500};
// `;
