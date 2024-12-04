import styled from '@emotion/styled';
import { Title3 } from '@styles/Common';
import variables from '@styles/Variables';
import { useState } from 'react';

//NOTE -  '전체' | '몽환' | '내추럴' | '러블리' | '시크' | '청순' | '상큼';
//TODO -  디자인 완성되면 색상 컬러 호출하도록 변경 필요

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

const NavStyle = styled.nav`
  width: 100%;
  box-sizing: border-box;
`;

const ThemeListStyle = styled.ul`
  display: flex;
  list-style: none;
`;

const ThemeButtonStyle = styled.button<{ isActive: boolean }>`
  padding: 1rem 1.5rem;
  height: 6rem;
  width: 100%;
  background-color: ${variables.colors.black};
  cursor: pointer;
  font-size: ${Title3};
  color: ${(props) => (props.isActive ? `${variables.colors.white}` : `${variables.colors.gray500}`)};
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
`;
