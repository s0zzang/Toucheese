import styled from '@emotion/styled';
import { useState } from 'react';

type Theme = '전체' | '몽환' | '내추럴' | '러블리' | '시크' | '청순' | '상큼';

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
//NOTE -  '전체' | '몽환' | '내추럴' | '러블리' | '시크' | '청순' | '상큼';
//TODO -  디자인 완성되면 색상 컬러 호출하도록 변경 필요

const NavStyle = styled.nav`
  width: 100%;
`;

const ThemeListStyle = styled.ul`
  display: flex;
  list-style: none;
`;

const ThemeButtonStyle = styled.button<{ isActive: boolean }>`
  padding: 0.8rem 1.6rem;
  border: none;
  background: none;
  cursor: pointer;
  color: ${(props) => (props.isActive ? '#000' : '#666')};
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};

  &:hover {
    color: #000;
  }
`;
