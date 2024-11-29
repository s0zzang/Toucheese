import styled from '@emotion/styled';
import { useState } from 'react';

type Theme = '전체' | '몽환' | '내추럴' | '러블리' | '시크' | '청순' | '상큼';

const ThemeNavigator = () => {
  const [activeTheme, setActiveTheme] = useState<Theme>('전체');
  const themes: Theme[] = ['전체', '몽환', '내추럴', '러블리', '시크', '청순', '상큼'];

  return (
    <Nav>
      <ThemeList>
        {themes.map((theme) => (
          <li key={theme}>
            <ThemeButton isActive={activeTheme === theme} onClick={() => setActiveTheme(theme)}>
              {theme}
            </ThemeButton>
          </li>
        ))}
      </ThemeList>
    </Nav>
  );
};

export default ThemeNavigator;
//NOTE -  '전체' | '몽환' | '내추럴' | '러블리' | '시크' | '청순' | '상큼';

const Nav = styled.nav`
  width: 100%;
`;

const ThemeList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ThemeButton = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  color: ${(props) => (props.isActive ? '#000' : '#666')};
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};

  &:hover {
    color: #000;
  }
`;
