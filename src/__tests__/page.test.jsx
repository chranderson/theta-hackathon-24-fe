import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../app/page';
import { env } from '@/lib/env';

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(env.NEXT_PUBLIC_APP_NAME);
  });
});
