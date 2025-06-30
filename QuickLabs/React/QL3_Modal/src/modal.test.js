import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: false,
    onClose: jest.fn(),
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Snapshot Testing', () => {
    test('should match snapshot when modal is closed', () => {
      const { asFragment } = render(
        <Modal {...defaultProps} isOpen={false}>
          <div>Modal Content</div>
        </Modal>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    test('should match snapshot when modal is open', () => {
      const { asFragment } = render(
        <Modal {...defaultProps} isOpen={true}>
          <div>Modal Content</div>
        </Modal>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Modal Visibility', () => {
    test('should be hidden by default when isOpen is false', () => {
      render(
        <Modal {...defaultProps} isOpen={false}>
          <div>Modal Content</div>
        </Modal>
      );
      
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('should display modal when isOpen is true', () => {
      render(
        <Modal {...defaultProps} isOpen={true}>
          <div>Modal Content</div>
        </Modal>
      );
      
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Modal Interactions', () => {
    test('should call onClose when close button is clicked', () => {
      const mockOnClose = jest.fn();
      
      render(
        <Modal {...defaultProps} isOpen={true} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('should call onClose when overlay is clicked', () => {
      const mockOnClose = jest.fn();
      
      render(
        <Modal {...defaultProps} isOpen={true} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );
      
      const overlay = screen.getByTestId('modal-overlay');
      fireEvent.click(overlay);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('should not call onClose when modal content is clicked', () => {
      const mockOnClose = jest.fn();
      
      render(
        <Modal {...defaultProps} isOpen={true} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );
      
      const modalContent = screen.getByText('Modal Content');
      fireEvent.click(modalContent);
      
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('should have correct accessibility attributes when open', () => {
      render(
        <Modal {...defaultProps} isOpen={true}>
          <div>Modal Content</div>
        </Modal>
      );
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby');
    });

    test('should focus the modal when opened', () => {
      render(
        <Modal {...defaultProps} isOpen={true}>
          <div>Modal Content</div>
        </Modal>
      );
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveFocus();
    });
  });

  describe('Complete Modal with Open/Close Flow', () => {
    test('should open modal when open button is clicked and close when close button is clicked', () => {
      const TestComponent = () => {
        const [isOpen, setIsOpen] = React.useState(false);
        
        return (
          <div>
            <button onClick={() => setIsOpen(true)}>Open Modal</button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <h2>Test Modal</h2>
              <p>This is modal content</p>
            </Modal>
          </div>
        );
      };

      render(<TestComponent />);
      
      // Initially modal should be closed
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
      
      // Click open button
      const openButton = screen.getByText('Open Modal');
      fireEvent.click(openButton);
      
      // Modal should now be visible
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('This is modal content')).toBeInTheDocument();
      
      // Click close button
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      
      // Modal should be hidden again
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    });
  });
});