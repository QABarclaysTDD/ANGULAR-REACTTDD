// UserList.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';
import { fetchUsers } from './userService';

// Mock the userService module
jest.mock('./userService');

const mockFetchUsers = fetchUsers;

describe('UserList Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  // Test 1: RED - Initial loading state
  test('displays loading message initially', () => {
    // Mock a pending promise to keep loading state
    mockFetchUsers.mockImplementation(() => new Promise(() => {}));
    
    render(<UserList />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // Test 2: RED - Successful data loading
  test('displays user data after successful fetch', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];

    mockFetchUsers.mockResolvedValue(mockUsers);
    
    render(<UserList />);
    
    // Initially shows loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for users to appear
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  // Test 3: RED - Error handling
  test('displays error message when fetch fails', async () => {
    const errorMessage = 'Failed to fetch users';
    mockFetchUsers.mockRejectedValue(new Error(errorMessage));
    
    render(<UserList />);
    
    // Initially shows loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch users')).toBeInTheDocument();
    });
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  // Test 4: RED - No users fallback
  test('displays no users message when empty array is returned', async () => {
    mockFetchUsers.mockResolvedValue([]);
    
    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByText('No users found')).toBeInTheDocument();
    });
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  // Test 5: RED - Verify service is called
  test('calls fetchUsers service on mount', async () => {
    mockFetchUsers.mockResolvedValue([]);
    
    render(<UserList />);
    
    expect(mockFetchUsers).toHaveBeenCalledTimes(1);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });
});