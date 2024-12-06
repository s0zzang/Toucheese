import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';

type Theme = '전체' | '몽환' | '내추럴' | '러블리' | '시크' | '청순' | '상큼';

/** home 에서 사용되는 테마셀렉터 */
const ThemeNavigator = () => {
  const [activeTheme, setActiveTheme] = useState<Theme>('전체');
  const themes: Theme[] = ['전체', '몽환', '내추럴', '러블리', '시크', '청순', '상큼'];

  const currentParams = new URLSearchParams(window.location.search);

  // activeTheme가 변경될 때마다 쿼리 파라미터 업데이트
  useEffect(() => {
    currentParams.set('vibeName', activeTheme); // VibeName 쿼리 파라미터 설정
    window.history.replaceState({}, '', `${window.location.pathname}?${currentParams}`); // URL 업데이트
  }, [activeTheme]); // activeTheme가 변경될 때마다 실행

  return (
    <NavStyle>
      <ThemeListStyle>
        {themes.map((theme) => (
          <li key={theme}>
            <ThemeButtonStyle isActive={activeTheme === theme} onClick={() => setActiveTheme(theme)}>
              {theme}
            </ThemeButtonStyle>
          </li>
        ))}
      </ThemeListStyle>
    </NavStyle>
  );
};

export default ThemeNavigator;

const NavStyle = styled.nav`
  width: 100%;
  box-sizing: border-box;
  background-color: ${variables.colors.black};
  padding: 1.4rem 1.2rem;
`;

const ThemeListStyle = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

// ThemeNavigator test 코드와 연관되어 있음
const ThemeButtonStyle = styled.button<{ isActive: boolean }>`
  text-align: center;
  font-size: ${variables.size.big};
  color: ${(props) => (props.isActive ? `${variables.colors.white}` : `${variables.colors.gray500}`)};
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
  position: relative;

  &::after {
    content: '';
    display: ${(props) => (props.isActive ? 'block' : 'none')};
    width: 4px;
    height: 4px;
    background-color: ${variables.colors.primary};
    position: absolute;
    left: 110%;
    bottom: 1.8rem;
    transform: translateX(-50%) rotate(45deg);
  }
`;
