import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { NavLink } from 'react-router-dom';

const StudioNavigator = ({ _id }: { _id: string }) => {
  return (
    <NavStyle>
      <UlStyle>
        <LiStyle>
          <NavLinkStyle to={`/studio/${_id}`} className={({ isActive }) => (isActive ? 'active' : '')} end>
            <span>홈</span>
          </NavLinkStyle>
        </LiStyle>
        <LiStyle>
          <NavLinkStyle to={`/studio/${_id}/menu`} className={({ isActive }) => (isActive ? 'active' : '')} end>
            <span>메뉴</span>
          </NavLinkStyle>
        </LiStyle>
        <LiStyle>
          <NavLinkStyle to={`/studio/${_id}/portfolio`} className={({ isActive }) => (isActive ? 'active' : '')} end>
            <span>포트폴리오</span>
          </NavLinkStyle>
        </LiStyle>
        <LiStyle>
          <NavLinkStyle to={`/studio/${_id}/review`} className={({ isActive }) => (isActive ? 'active' : '')} end>
            <span>리뷰</span>
          </NavLinkStyle>
        </LiStyle>
      </UlStyle>
    </NavStyle>
  );
};

const NavStyle = styled.nav``;

const UlStyle = styled.ul`
  display: flex;
`;

const LiStyle = styled.li`
  width: 25%;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
`;

const NavLinkStyle = styled(NavLink)`
  position: relative;
  display: block;
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  color: ${variables.colors.gray600};

  & > span {
    position: relative;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.4rem;
  }

  &::before {
    content: '';
    position: absolute;
    background-color: ${variables.colors.gray300};
    height: 0.1rem;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &.active {
    color: ${variables.colors.black};
  }

  &.active::before {
    content: '';
    position: absolute;
    background-color: ${variables.colors.black};
    height: 0.2rem;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &.active > span::after {
    content: '';
    position: absolute;
    right: calc(-4 * sqrt(2) * 0.1rem);
    top: calc(-2 * sqrt(2) * 0.1rem);
    width: 0.4rem;
    height: 0.4rem;
    background-color: ${variables.colors.primary};
    transform: translateX(-25%) rotate(45deg);
  }
`;

export default StudioNavigator;
