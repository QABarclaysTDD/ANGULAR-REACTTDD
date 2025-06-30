import { useState } from 'react';

const SaveButton = ({ onSave }) => {
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSave = () => {
    const trimmedName = name.trim();
    
    if (trimmedName) {
      onSave(trimmedName);
      setName(''); // Reset form after successful submission
    }
  };

  return (
    <div>
      <label htmlFor="name-input">
        Name:
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default SaveButton;