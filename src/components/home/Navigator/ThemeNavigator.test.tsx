// import { render, screen, fireEvent } from '@testing-library/react';
// import { describe, it, expect } from 'vitest';

// describe('ThemeNavigator', () => {
//   it('모든 테마 버튼이 렌더링되어야 합니다', () => {
//     render(<ThemeNavigator />);

//     const themes = ['전체', '몽환', '내추럴', '러블리', '시크', '청순', '상큼'];
//     themes.forEach((theme) => {
//       expect(screen.getByText(theme)).toBeInTheDocument();
//     });
//   });

//   it('초기 상태에서는 "전체" 테마가 활성화되어 있어야 합니다', () => {
//     render(<ThemeNavigator />);

//     const activeButton = screen.getByText('전체');
//     expect(activeButton).toHaveStyle('font-weight: bold');
//     expect(activeButton).toHaveStyle('color: rgb(0, 0, 0)');
//   });

//   it('테마 버튼 클릭시 활성화 상태가 변경되어야 합니다', () => {
//     render(<ThemeNavigator />);

//     const newThemeButton = screen.getByText('몽환');
//     fireEvent.click(newThemeButton);

//     expect(newThemeButton).toHaveStyle('font-weight: bold');
//     expect(newThemeButton).toHaveStyle('color: rgb(0, 0, 0)');

//     const previousActiveButton = screen.getByText('전체');
//     expect(previousActiveButton).toHaveStyle('font-weight: normal');
//     expect(previousActiveButton).toHaveStyle('color: rgb(102, 102, 102)');
//   });
// });
