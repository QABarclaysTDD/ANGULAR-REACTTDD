import React from 'react';
import { render, screen } from '@testing-library/react';
import FileLoader from './FileLoader';
import { fetchFile } from './fileService';

// Mock the fileService module
jest.mock('./fileService');

describe('FileLoader Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('displays loading state initially', () => {
    // Mock fetchFile to return a pending promise
    fetchFile.mockReturnValue(new Promise(() => {}));
    
    render(<FileLoader fileId="test-id" />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays fetched content after loading', async () => {
    // Mock fetchFile to return successful data
    fetchFile.mockResolvedValue({ content: 'Sample text' });
    
    render(<FileLoader fileId="test-id" />);
    
    // Initially shows loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for content to appear
    const content = await screen.findByText('Sample text');
    expect(content).toBeInTheDocument();
    
    // Loading should be gone
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    
    // Verify fetchFile was called with correct id
    expect(fetchFile).toHaveBeenCalledWith('test-id');
    expect(fetchFile).toHaveBeenCalledTimes(1);
  });

  test('displays fallback UI when fetchFile returns empty content', async () => {
    // Mock fetchFile to return empty content
    fetchFile.mockResolvedValue({ content: '' });
    
    render(<FileLoader fileId="empty-file" />);
    
    // Wait for fallback message
    const fallback = await screen.findByText('No content available');
    expect(fallback).toBeInTheDocument();
    
    // Loading should be gone
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('displays error UI when fetchFile fails', async () => {
    // Mock fetchFile to reject
    fetchFile.mockRejectedValue(new Error('Failed to fetch file'));
    
    render(<FileLoader fileId="invalid-id" />);
    
    // Wait for error message
    const errorMessage = await screen.findByText('Error loading file');
    expect(errorMessage).toBeInTheDocument();
    
    // Loading should be gone
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('displays fallback UI when fetchFile returns null or undefined', async () => {
    // Mock fetchFile to return null
    fetchFile.mockResolvedValue(null);
    
    render(<FileLoader fileId="null-file" />);
    
    // Wait for fallback message
    const fallback = await screen.findByText('No content available');
    expect(fallback).toBeInTheDocument();
  });

  test('refetches content when fileId prop changes', async () => {
    // Mock fetchFile for initial render
    fetchFile.mockResolvedValue({ content: 'First content' });
    
    const { rerender } = render(<FileLoader fileId="file-1" />);
    
    // Wait for first content
    await screen.findByText('First content');
    expect(fetchFile).toHaveBeenCalledWith('file-1');
    
    // Mock fetchFile for second render
    fetchFile.mockResolvedValue({ content: 'Second content' });
    
    // Rerender with different fileId
    rerender(<FileLoader fileId="file-2" />);
    
    // Should show loading again
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for second content
    await screen.findByText('Second content');
    expect(fetchFile).toHaveBeenCalledWith('file-2');
    expect(fetchFile).toHaveBeenCalledTimes(2);
  });
});