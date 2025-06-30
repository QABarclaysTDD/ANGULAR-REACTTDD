import React, { useState } from 'react';
import FileLoader from './FileLoader';

/**
 * Example usage of the FileLoader component
 */
const Example = () => {
  const [selectedFileId, setSelectedFileId] = useState('document-1');

  const fileOptions = [
    { id: 'document-1', name: 'Document 1' },
    { id: 'document-2', name: 'Document 2' },
    { id: 'empty-file', name: 'Empty File' },
    { id: 'invalid-id', name: 'Invalid File' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>FileLoader Component Demo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="file-select">Select a file to load: </label>
        <select
          id="file-select"
          value={selectedFileId}
          onChange={(e) => setSelectedFileId(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          {fileOptions.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div 
        style={{ 
          border: '1px solid #ccc', 
          padding: '15px', 
          borderRadius: '4px',
          backgroundColor: '#f9f9f9',
          minHeight: '100px'
        }}
      >
        <h3>File Content:</h3>
        <FileLoader fileId={selectedFileId} />
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p><strong>Demo Notes:</strong></p>
        <ul>
          <li>"Document 1" and "Document 2" will show successful content loading</li>
          <li>"Empty File" will demonstrate the empty content fallback</li>
          <li>"Invalid File" will demonstrate error handling</li>
          <li>All file fetching is mocked - no real HTTP requests are made</li>
        </ul>
      </div>
    </div>
  );
};

export default Example;