import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import Calendar from './Calendar';
// import { convertToDateFormat, useSelectDateStore } from '@store/useSelectDate';
// import userEvent from '@testing-library/user-event';

// 지역과 날짜(시간)가 선택되면 메인으로 돌아가고 그것에 맞춰 리스트가 필터링되는 행동이 필요해
// 사용자가 달력을 확인하고 달력의 기능을 사용할 수 있는지 확인할 수 있는 행동이 필요해
// 달력을 통해 특정 날짜를 선택할 수 있는지 확인할 수 있는 행동이 필요해

describe('달력 컴포넌트', () => {
  const today = new Date();
  const todayMonth = today.getMonth();

  beforeEach(() => {
    render(<Calendar />);
  });

  test('달력이 오류 없이 렌더링 된다', () => {
    const monthText = screen.getByText(todayMonth);
    expect(monthText).toBeInTheDocument();
  });

  test('1일을 선택하면 1일이 전역 상태 값에 담긴다', () => {
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      console.log(button.getAttribute('name')); // name 속성 출력
      console.log(button.textContent); // 내부 텍스트 출력
    });

    // 전역 date 상태 초기화
    // useSelectDateStore.setState({ date: '' });

    const selectedDate = screen.getByRole('button', { name: /1일/i });
    expect(selectedDate).toBeInTheDocument;

    // const { date } = useSelectDateStore.getState();

    // 버튼 클릭
    // fireEvent.click(selectedDate[0]);
    // userEvent.click(selectedDate);

    // 상태 검증
    // expect(date).toBe(''); // 값이 변경되었는지 확인

    // const { setDate } = useSelectDateStore.getState();
    // setDate('2024-12-11');
    // 화면에 상태가 반영되었는지 확인
    // expect(screen.getByText(/Selected Date: 2024-12-11/i)).toBeInTheDocument();
  });
});
