import React, { useState } from 'react';
import Modal from './Modal';

const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Modal Component Example</h1>
      <p>Click the button below to open the modal:</p>
      
      <button 
        onClick={openModal}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Open Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 style={{ marginTop: 0, marginBottom: '16px' }}>
          Welcome to the Modal!
        </h2>
        <p>
          This is a sample modal component built with React and tested using
          React Testing Library and Jest.
        </p>
        <p>
          You can close this modal by:
        </p>
        <ul>
          <li>Clicking the × button in the top-right corner</li>
          <li>Clicking outside the modal content (on the overlay)</li>
          <li>Pressing the Escape key</li>
        </ul>
        <div style={{ marginTop: '24px' }}>
          <button 
            onClick={closeModal}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '8px',
            }}
          >
            Close Modal
          </button>
          <button 
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Save Changes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalExample;