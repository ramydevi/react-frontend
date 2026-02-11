import { render, screen } from '@testing-library/react';
import App from './App';

test('renders budget heading', () => {
  render(<App />);
  expect(screen.getByText(/Manage Your Budget/i)).toBeInTheDocument();
});

test('basic test passes', () => {
  expect(true).toBe(true);
});
