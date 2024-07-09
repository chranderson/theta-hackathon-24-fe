import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../app/components/header';
import { env } from '@/lib/env';

describe('Page', () => {
  it('renders a heading', () => {
    render(<Header />);
    const brandHomeLink = screen.getByRole('link', {
      name: env.NEXT_PUBLIC_TEAM_NAME
    });
    expect(brandHomeLink).toBeInTheDocument();
    expect(brandHomeLink).toHaveAttribute('href', '/');
  });
});
