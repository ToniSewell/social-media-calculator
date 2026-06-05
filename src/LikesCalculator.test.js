import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LikesCalculator } from './LikesCalculator';

describe('LikesCalculator', () => {
  it('compresses large like counts so they do not dominate the score', () => {
    const onScoreChange = jest.fn();

    render(<LikesCalculator weight={10} onScoreChange={onScoreChange} />);

    const input = screen.getByPlaceholderText('Enter number');
    fireEvent.change(input, { target: { value: '1000' } });

    expect(screen.getByText('3.00')).toBeInTheDocument();

    const lastCall = onScoreChange.mock.calls.at(-1);
    expect(lastCall[0]).toBeCloseTo(3.0004, 4);
    expect(lastCall[1]).toBe(true);
    expect(lastCall[2]).toBe(1000);
  });
});
