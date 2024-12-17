/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import BackButton from '@components/BackButton/BackButton';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import StudioMenuItem from './StudioMenuItem';
import { useParams } from 'react-router-dom';

const StudioMenu = () => {
  const { _id } = useParams();
  return (
    <>
      <BackButton ariaLabel="스튜디오 이름" />
      <StudioNavigator _id={String(_id)} />
      <div css={ItemLIstStyle}>
        <StudioMenuItem StudioId={_id} />
      </div>
    </>
  );
};

export default StudioMenu;

const ItemLIstStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 0.4rem;
`;
