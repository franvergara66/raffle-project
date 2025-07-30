import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page by default', () => {
  render(<App />);
  const loginText = screen.getByText(/admin login/i);
  expect(loginText).toBeInTheDocument();
});
