import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders teemunkierros filter', () => {
  render(<App />);
  const filter = screen.getByText(/teemunkierros/i);
  expect(filter).toBeInTheDocument();
});
