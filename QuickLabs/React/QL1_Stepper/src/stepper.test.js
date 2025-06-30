import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Stepper from './stepper';

describe('Stepper Component', () => {
  // Step 1: RED - Write failing test for initial state
  test('should display initial counter value of 0', () => {
    render(<Stepper />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  // Step 2: RED - Write failing test for increment button
  test('should increment counter by 1 when + button is clicked', () => {
    render(<Stepper />);
    const incrementButton = screen.getByText('+');
    
    fireEvent.click(incrementButton);
    
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  // Step 3: RED - Write failing test for custom step prop
  test('should increment counter by step value when step prop is provided', () => {
    render(<Stepper step={5} />);
    const incrementButton = screen.getByText('+');
    
    fireEvent.click(incrementButton);
    
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  // Step 4: RED - Write failing test for decrement button
  test('should decrement counter by step value when - button is clicked', () => {
    render(<Stepper step={3} />);
    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');
    
    // First increment to 3
    fireEvent.click(incrementButton);
    expect(screen.getByText('3')).toBeInTheDocument();
    
    // Then decrement back to 0
    fireEvent.click(decrementButton);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  // Additional test for multiple clicks
  test('should handle multiple increment and decrement operations', () => {
    render(<Stepper step={2} />);
    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');
    
    // Increment twice: 0 -> 2 -> 4
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(screen.getByText('4')).toBeInTheDocument();
    
    // Decrement once: 4 -> 2
    fireEvent.click(decrementButton);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  // Test default step value
  test('should use default step of 1 when no step prop provided', () => {
    render(<Stepper />);
    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');
    
    // Test increment with default step
    fireEvent.click(incrementButton);
    expect(screen.getByText('1')).toBeInTheDocument();
    
    // Test decrement with default step
    fireEvent.click(decrementButton);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  // Test accessibility with getByRole
  test('should render buttons with proper roles', () => {
    render(<Stepper />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
  });
});