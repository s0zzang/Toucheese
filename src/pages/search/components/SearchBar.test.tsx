import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { describe, test, expect, vi } from 'vitest';

describe('SearchBar', () => {
  test('Enter 키를 눌렀을 때 검색어로 onSearch가 정상적으로 호출된다', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('스튜디오를 검색해보세요.');

    fireEvent.change(input, { target: { value: '검색어' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnSearch).toHaveBeenCalledWith('검색어');
    expect(input).toHaveValue('');
  });
});
