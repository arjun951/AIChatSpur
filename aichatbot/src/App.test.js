import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  sessionStorage.setItem('ai_chat_key', 'test-session');
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ sessionId: 'test-session', messages: [] }),
    })
  );
});

afterEach(() => {
  sessionStorage.clear();
  jest.restoreAllMocks();
});

test('renders chat header and send button', async () => {
  render(<App />);
  expect(screen.getByText(/spur ai agent/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByRole('button', { name: /send/i })).toBeEnabled();
  });
});
