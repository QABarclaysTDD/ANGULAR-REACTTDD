import { render, screen, fireEvent } from '@testing-library/react';
import SaveButton from './SaveButton';

describe('SaveButton Component', () => {
  let mockOnSave;

  beforeEach(() => {
    mockOnSave = jest.fn();
  });

  test('renders input field and save button', () => {
    render(<SaveButton onSave={mockOnSave} />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/save/i)).toBeInTheDocument();
  });

  test('input updates as expected when typing', () => {
    render(<SaveButton onSave={mockOnSave} />);
    
    const input = screen.getByLabelText(/name/i);
    
    fireEvent.change(input, { target: { value: 'John Doe' } });
    
    expect(input.value).toBe('John Doe');
  });

  test('clicking save button triggers onSave with correct value', () => {
    render(<SaveButton onSave={mockOnSave} />);
    
    const input = screen.getByLabelText(/name/i);
    const saveButton = screen.getByText(/save/i);
    
    // Enter a name
    fireEvent.change(input, { target: { value: 'John Doe' } });
    
    // Click save
    fireEvent.click(saveButton);
    
    // Assert onSave was called once with correct value
    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith('John Doe');
  });

  test('onSave is not called when input is empty', () => {
    render(<SaveButton onSave={mockOnSave} />);
    
    const saveButton = screen.getByText(/save/i);
    
    // Click save without entering anything
    fireEvent.click(saveButton);
    
    // Assert onSave was not called
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  test('onSave is not called when input contains only whitespace', () => {
    render(<SaveButton onSave={mockOnSave} />);
    
    const input = screen.getByLabelText(/name/i);
    const saveButton = screen.getByText(/save/i);
    
    // Enter only whitespace
    fireEvent.change(input, { target: { value: '   ' } });
    
    // Click save
    fireEvent.click(saveButton);
    
    // Assert onSave was not called
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  test('form resets after successful submission', () => {
    render(<SaveButton onSave={mockOnSave} />);
    
    const input = screen.getByLabelText(/name/i);
    const saveButton = screen.getByText(/save/i);
    
    // Enter a name
    fireEvent.change(input, { target: { value: 'John Doe' } });
    
    // Click save
    fireEvent.click(saveButton);
    
    // Assert input is cleared
    expect(input.value).toBe('');
  });

  test('multiple valid submissions work correctly', () => {
    render(<SaveButton onSave={mockOnSave} />);
    
    const input = screen.getByLabelText(/name/i);
    const saveButton = screen.getByText(/save/i);
    
    // First submission
    fireEvent.change(input, { target: { value: 'John Doe' } });
    fireEvent.click(saveButton);
    
    // Second submission
    fireEvent.change(input, { target: { value: 'Jane Smith' } });
    fireEvent.click(saveButton);
    
    // Assert onSave was called twice with correct values
    expect(mockOnSave).toHaveBeenCalledTimes(2);
    expect(mockOnSave).toHaveBeenNthCalledWith(1, 'John Doe');
    expect(mockOnSave).toHaveBeenNthCalledWith(2, 'Jane Smith');
  });
});