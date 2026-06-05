import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the calculator navigation', () => {
  render(<App />);

  expect(screen.getByText('Feed Optimiser')).toBeInTheDocument();
  expect(screen.getByText('Calculator')).toBeInTheDocument();
});
