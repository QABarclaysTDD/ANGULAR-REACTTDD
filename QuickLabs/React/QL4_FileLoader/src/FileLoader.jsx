import React, { useState, useEffect } from 'react';
import { fetchFile } from './fileService';

/**
 * FileLoader Component - Fetches and displays file content
 * @param {Object} props
 * @param {string} props.fileId - The ID of the file to load
 */
const FileLoader = ({ fileId }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates if component unmounts

    const loadFile = async () => {
      try {
        setLoading(true);
        setError(null);
        setContent(null);

        const result = await fetchFile(fileId);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setContent(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    if (fileId) {
      loadFile();
    }

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [fileId]); // Re-run effect when fileId changes

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error loading file</div>;
  }

  // Empty or null content
  if (!content || !content.content || content.content.trim() === '') {
    return <div>No content available</div>;
  }

  // Success state - display content
  return (
    <div>
      <div>{content.content}</div>
    </div>
  );
};

export default FileLoader;