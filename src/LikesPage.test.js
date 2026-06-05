import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LikesPage from './LikesPage';

describe('LikesPage weight slider', () => {
  it('updates the likes importance text when the slider value changes', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/likes' }]}>
        <LikesPage />
      </MemoryRouter>
    );

    const slider = screen.getAllByRole('slider')[0];
    fireEvent.input(slider, { target: { value: '8' } });

    expect(screen.getAllByText('Importance: 8/10')[0]).toBeInTheDocument();
  });
});
