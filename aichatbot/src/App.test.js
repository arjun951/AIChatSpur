import { render, screen } from '@testing-library/react';
import App from './App';

test('renders chat header and send button', () => {
  render(<App />);
  expect(screen.getByText(/spur ai agent/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
});
