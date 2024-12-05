/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Hidden, Title2 } from '@styles/Common';
import variables from '@styles/Variables';
import { useState } from 'react';

const StudioItem = () => {
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  // 북마크 설정/해제 api 호출
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation;

    setHasLiked((state) => !state);

    console.log('북마크 설정!');
  };

  return (
    <LiStyle>
      <div
        // 이미지 슬라이더 완성되면 삭제
        css={css`
          box-shadow: inset 0 0 10px ${variables.colors.primary900};
          width: calc(100% + ${variables.layoutPadding});
          height: 11.8rem;
          margin-right: ${variables.layoutPadding};
          margin-bottom: 1.4rem;
        `}
      >
        이미지 슬라이드
      </div>

      <ItemContentStyle>
        <ItemInfoStyle>
          <TitleStyle css={Title2}>{`스튜디오 이름`}</TitleStyle>
          <InfoContainerStyle>
            <div>
              <img src="/img/icon-rating.svg" />
              <p>
                {4.3}
                <span>{` (157개의 평가)`}</span>
              </p>
            </div>
            <div>
              <img src="/img/icon-price.svg" />
              <p>{`15,000 ~`}</p>
            </div>
          </InfoContainerStyle>
          <InfoContainerStyle>
            <div>
              <img src="/img/icon-location.svg" />
              <p>{`종로구 종로3길 17`}</p>
            </div>
            <div>
              <img src="/img/icon-time.svg" />
              <p>{`10:00 - 21:00`}</p>
            </div>
          </InfoContainerStyle>
        </ItemInfoStyle>
        <BookmarkStyle>
          <button onClick={handleClick}>
            <img src={`/img/icon-bookmark-${hasLiked ? 'active' : 'inactive'}.svg`} alt={`북마크 ${hasLiked ? '해제' : '등록'}`} />
            <span css={Hidden}>북마크 {`${hasLiked ? '해제' : '등록'}하기`}</span>
          </button>
          <p>127</p>
        </BookmarkStyle>
      </ItemContentStyle>
    </LiStyle>
  );
};

const LiStyle = styled.li`
  padding-bottom: 1.6rem;
  border-bottom: 0.1rem solid ${variables.colors.gray300};

  &:last-child {
    padding-bottom: unset;
    border-bottom: unset;
  }
`;

const ItemContentStyle = styled.div`
  display: flex;
`;

const ItemInfoStyle = styled.div`
  flex-grow: 1;
`;

const TitleStyle = styled.p`
  margin-bottom: 0.5rem;
`;

const InfoContainerStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.4rem;

  & > div {
    display: flex;
    align-items: center;
    gap: 0.3rem;

    & > img {
      width: 1.3rem;
      height: 1.3rem;
    }

    & > p {
      line-height: 2rem;

      & > span {
        color: ${variables.colors.gray800};
      }
    }
  }

  &:last-child {
    margin-bottom: unset;
  }
`;

const BookmarkStyle = styled.div`
  flex-shrink: 0;
  margin-left: auto;

  & > button {
    width: 2.4rem;
    height: 2.4rem;
    margin: 0 auto;

    & > img {
      width: 100%;
      aspect-ratio: 1/1;
      margin: 0 auto;
    }
  }

  & > p {
    color: ${variables.colors.gray600};
    margin: 0 auto;
    text-align: center;
    font-size: 1rem;
    line-height: 1.2;
  }
`;

export default StudioItem;
