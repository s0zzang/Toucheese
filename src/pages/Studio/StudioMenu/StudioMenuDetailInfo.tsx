/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { TypoBodyMdR, TypoTitleXsM } from '@styles/Common';
import { IMenuListRes } from 'types/types';
import { Dispatch, SetStateAction, useState } from 'react';

const StudioMenuDetailInfo = ({ infoItem, setTotalPrice }: { infoItem: IMenuListRes | undefined; setTotalPrice: Dispatch<SetStateAction<number>> }) => {
  const handleOptionClick = (price: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setTotalPrice((prev) => (isChecked ? prev + price : prev - price));
  };

  // 추후 예약 기능시 필요
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log('최종 결제 금액:', totalPrice);
  // };

  return (
    <>
      <section css={MenuInfoStyle}>
        <div className="menuInfoItem">
          <h4 className="time">예상 소요 시간</h4>
          <p>약 60분</p>
        </div>
        <div className="menuInfoItem">
          <h4 className="camera">기본 촬영 수</h4>
          <p>70-80컷</p>
        </div>
        <div className="menuInfoItem">
          <h4 className="crop">인화 사이즈</h4>
          <p>4x6in</p>
        </div>
        <div className="menuInfoItem">
          <h4 className="folder">기본 제공 파일</h4>
          <p>3포즈 리터칭 JPG파일</p>
        </div>
      </section>

      <section css={TotalPriceStyle}>
        <h3>기본 가격</h3>
        <p>{infoItem?.price.toLocaleString('ko-KR')}원</p>
      </section>

      <form css={AddOptionsWrapperStyle}>
        {/* <form css={AddOptionsWrapperStyle} onSubmit={handleSubmit} id="priceForm">/ */}
        <h3>추가 옵션</h3>

        <div css={AddOptionsListStyle}>
          {infoItem?.additionalOptions.map((item) => (
            <fieldset key={item.id}>
              <div css={AddOptionItemStyle}>
                <input type="checkbox" id={`${item?.price}`} name={`${item?.price}`} value="OptionPrice" onChange={(e) => handleOptionClick(item.price, e)} />
                <label htmlFor={`${item?.price}`}>
                  <span>{item.name}</span>
                </label>
              </div>
              <p>+{item?.price.toLocaleString('ko-KR')}원</p>
            </fieldset>
          ))}
        </div>
      </form>
    </>
  );
};

export default StudioMenuDetailInfo;

const MenuInfoStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.4rem 0;

  .menuInfoItem {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    ${TypoBodyMdR}

    & h4 {
      color: ${variables.colors.gray800};
      background-position: left;
      padding-left: 2rem;
      background-repeat: no-repeat;
      background-size: 1.6rem;

      &.time {
        background-image: url(/img/icon-clock.svg);
      }
      &.camera {
        background-image: url(/img/icon-camera-roll.svg);
      }
      &.crop {
        background-image: url(/img/icon-crop.svg);
      }
      &.folder {
        background-image: url(/img/icon-folder.svg);
      }
    }
  }
`;

const TotalPriceStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.8rem 0;
  ${TypoTitleXsM}
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: -1.6rem;
    right: -1.6rem;
    bottom: -1rem;
    height: 1rem;
    background-color: ${variables.colors.gray300};
  }
`;

const AddOptionsWrapperStyle = css`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 2rem;

  & h3 {
    padding: 1.8rem 0;
    ${TypoTitleXsM}
  }

  .optionList {
    display: flex;
    flex-direction: column;
    padding: 1.2rem 0;
  }
`;

const AddOptionsListStyle = css`
  display: flex;
  flex-direction: column;

  & fieldset {
    display: flex;
    padding: 1.2rem 0;
    height: 4.4rem;
  }
`;

const AddOptionItemStyle = css`
  width: 100%;
  display: flex;
  align-items: center;

  & > input[type='checkbox'] {
    width: 1.8rem;
    height: 1.8rem;
    border: 0.2rem solid ${variables.colors.gray600};
    border-radius: 0.2rem;
  }

  & > input[type='checkbox']:checked {
    background-color: ${variables.colors.primary600};
    border: none;
    position: relative;
  }
  & > input[type='checkbox']:checked::before {
    content: '';
    display: block;
    width: 1.8rem;
    height: 1.8rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 1.2rem;
    background-image: url(/img/icon-check-white.svg);
  }

  & label {
    margin-right: auto;
  }
`;
