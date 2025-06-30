import { useState } from 'react';
import SaveButton from './SaveButton';

const SaveButtonDemo = () => {
  const [savedNames, setSavedNames] = useState([]);

  const handleSave = (name) => {
    setSavedNames(prev => [...prev, name]);
    console.log('Saved name:', name);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>SaveButton Component Demo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <SaveButton onSave={handleSave} />
      </div>
      
      <div>
        <h2>Saved Names:</h2>
        {savedNames.length === 0 ? (
          <p>No names saved yet.</p>
        ) : (
          <ul>
            {savedNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SaveButtonDemo;