import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { useState } from 'react';

type Theme = '전체' | '몽환' | '내추럴' | '러블리' | '시크' | '청순' | '상큼';

/** home 에서 사용되는 네비게이션바 */
const ThemeNavigator = () => {
  const [activeTheme, setActiveTheme] = useState<Theme>('전체');
  const themes: Theme[] = ['전체', '몽환', '내추럴', '러블리', '시크', '청순', '상큼'];

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
  position: fixed;
  left: 0;
  right: 0;
`;

const ThemeListStyle = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-between;
  cursor: pointer;
`;
// ThemeNavigator test 코드와 연관되어 있음
const ThemeButtonStyle = styled.button<{ isActive: boolean }>`
  padding: 1.2rem 1rem;
  font-size: ${variables.size.big};
  color: ${(props) => (props.isActive ? `${variables.colors.white}` : `${variables.colors.gray500}`)};
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
`;
