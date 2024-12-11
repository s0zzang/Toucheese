import { render, screen } from '@testing-library/react';
import BookingSearchContainer from './BookingSearchContainer';
import { describe, expect, test } from 'vitest';

describe('BookingSearchContainer', () => {
  test('컴포넌트가 올바르게 렌더링된다', async () => {
    render(<BookingSearchContainer />);
    const locationText = await screen.findByText('전체지역');
    expect(locationText).toBeInTheDocument();
    expect(screen.getByText('예약 날짜와 시간을 선택해주세요.')).toBeInTheDocument();
  });

  // 초기 상태 테스트
  test('초기 상태의 버튼들이 올바른 텍스트를 가진다', () => {
    render(<BookingSearchContainer />);
    const locationButton = screen.getByText('전체지역');
    const dateButton = screen.getByText('예약 날짜와 시간을 선택해주세요.');
    expect(locationButton).toBeInTheDocument();
    expect(dateButton).toBeInTheDocument();
  });
});
