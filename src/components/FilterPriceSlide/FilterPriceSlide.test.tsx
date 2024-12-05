import { render, screen, fireEvent } from '@testing-library/react';
import FilterPriceSlideComponent from './FilterPriceSlide';
import { describe, expect, test } from 'vitest';

describe('FilterPriceSlideComponent', () => {
  test('초기값이 올바르게 렌더링되는지 확인', () => {
    render(<FilterPriceSlideComponent />);
    expect(screen.getByText(/원~/)).toHaveTextContent('10000원~');
    expect(screen.getByText(/원 이상/)).toHaveTextContent('200000 원 이상');
  });

  test('최소값 슬라이더 변경 시 값이 업데이트되는지 확인', () => {
    render(<FilterPriceSlideComponent />);
    const minSlider = screen.getByLabelText('slider1');

    fireEvent.change(minSlider, { target: { value: '15000' } });
    expect(screen.getByText(/원~/)).toHaveTextContent('15000원~');
  });

  test('최대값 슬라이더 변경 시 값이 업데이트되는지 확인', () => {
    render(<FilterPriceSlideComponent />);
    const maxSlider = screen.getByLabelText('slider2');

    fireEvent.change(maxSlider, { target: { value: '180000' } });
    expect(screen.getByText(/원 이상/)).toHaveTextContent('180000 원 이상');
  });
});
