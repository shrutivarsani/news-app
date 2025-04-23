
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  const renderNavbar = () =>
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

  test('renders navbar with correct classes', () => {
    renderNavbar();
    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toHaveClass('navbar', 'navbar-expand-lg', 'bg-dark', 'navbar-dark');
  });

  test('renders brand link with News App text and links to /', () => {
    renderNavbar();
    const brandLink = screen.getByText('News App');
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '/');
    expect(brandLink).toHaveClass('navbar-brand');
  });

  test('renders search link with button and links to /search', () => {
    renderNavbar();
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
    const searchLink = searchButton.parentElement;
    expect(searchLink).toHaveAttribute('href', '/search');
    expect(searchLink).toHaveClass('nav-link');
  });

  // Test 4: Renders navbar toggle button with correct attributes
  test('renders navbar toggle button with correct attributes', () => {
    renderNavbar();
    const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveClass('navbar-toggler');
    expect(toggleButton).toHaveAttribute('data-bs-toggle', 'collapse');
    expect(toggleButton).toHaveAttribute('data-bs-target', '#navbarSupportedContent');
    expect(toggleButton).toHaveAttribute('aria-controls', 'navbarSupportedContent');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(toggleButton).toHaveAttribute('aria-label', 'Toggle navigation');
  });

  test('renders collapsible menu with correct classes and ID', () => {
    renderNavbar();
    const collapseDiv = screen.getByRole('button', { name: /toggle navigation/i }).parentElement.querySelector('#navbarSupportedContent');
    expect(collapseDiv).toBeInTheDocument();
    expect(collapseDiv).toHaveClass('collapse', 'navbar-collapse');
    expect(collapseDiv).toHaveAttribute('id', 'navbarSupportedContent');
  });
});