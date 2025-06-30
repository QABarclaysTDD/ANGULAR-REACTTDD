import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';

// Helper function to render NavigationMenu with router
const renderWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <NavigationMenu />
    </MemoryRouter>
  );
};

describe('NavigationMenu', () => {
  test('renders navigation menu with all links', () => {
    renderWithRouter();
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  test('renders home page content by default', () => {
    renderWithRouter(['/']);
    
    expect(screen.getByText('Welcome to Home Page')).toBeInTheDocument();
    expect(screen.queryByText('About Us Page')).not.toBeInTheDocument();
    expect(screen.queryByText('User Profile Page')).not.toBeInTheDocument();
  });

  test('renders home page when starting at /home route', () => {
    renderWithRouter(['/home']);
    
    expect(screen.getByText('Welcome to Home Page')).toBeInTheDocument();
  });

  test('renders about page when starting at /about route', () => {
    renderWithRouter(['/about']);
    
    expect(screen.getByText('About Us Page')).toBeInTheDocument();
    expect(screen.queryByText('Welcome to Home Page')).not.toBeInTheDocument();
    expect(screen.queryByText('User Profile Page')).not.toBeInTheDocument();
  });

  test('renders profile page when starting at /profile route', () => {
    renderWithRouter(['/profile']);
    
    expect(screen.getByText('User Profile Page')).toBeInTheDocument();
    expect(screen.queryByText('Welcome to Home Page')).not.toBeInTheDocument();
    expect(screen.queryByText('About Us Page')).not.toBeInTheDocument();
  });

  test('navigates to about page when about link is clicked', () => {
    renderWithRouter(['/']);
    
    // Initially on home page
    expect(screen.getByText('Welcome to Home Page')).toBeInTheDocument();
    
    // Click about link
    fireEvent.click(screen.getByText('About'));
    
    // Should now show about page
    expect(screen.getByText('About Us Page')).toBeInTheDocument();
    expect(screen.queryByText('Welcome to Home Page')).not.toBeInTheDocument();
  });

  test('navigates to profile page when profile link is clicked', () => {
    renderWithRouter(['/']);
    
    // Initially on home page
    expect(screen.getByText('Welcome to Home Page')).toBeInTheDocument();
    
    // Click profile link
    fireEvent.click(screen.getByText('Profile'));
    
    // Should now show profile page
    expect(screen.getByText('User Profile Page')).toBeInTheDocument();
    expect(screen.queryByText('Welcome to Home Page')).not.toBeInTheDocument();
  });

  test('navigates back to home when home link is clicked from another page', () => {
    renderWithRouter(['/about']);
    
    // Initially on about page
    expect(screen.getByText('About Us Page')).toBeInTheDocument();
    
    // Click home link
    fireEvent.click(screen.getByText('Home'));
    
    // Should now show home page
    expect(screen.getByText('Welcome to Home Page')).toBeInTheDocument();
    expect(screen.queryByText('About Us Page')).not.toBeInTheDocument();
  });

  test('shows active link styling for current route', () => {
    renderWithRouter(['/about']);
    
    const aboutLink = screen.getByText('About').closest('a');
    const homeLink = screen.getByText('Home').closest('a');
    
    expect(aboutLink).toHaveClass('active');
    expect(homeLink).not.toHaveClass('active');
  });

  test('updates active link when navigation occurs', () => {
    renderWithRouter(['/']);
    
    const homeLink = screen.getByText('Home').closest('a');
    const profileLink = screen.getByText('Profile').closest('a');
    
    // Initially home should be active
    expect(homeLink).toHaveClass('active');
    expect(profileLink).not.toHaveClass('active');
    
    // Click profile link
    fireEvent.click(screen.getByText('Profile'));
    
    // Now profile should be active
    expect(profileLink).toHaveClass('active');
    expect(homeLink).not.toHaveClass('active');
  });

  test('handles unknown routes by showing 404 page', () => {
    renderWithRouter(['/unknown']);
    
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});