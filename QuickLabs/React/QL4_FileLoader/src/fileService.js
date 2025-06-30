// fileService.js - Service module for fetching file data

/**
 * Fetches file content by ID
 * @param {string} id - The file identifier
 * @returns {Promise<{content: string}>} Promise that resolves to file data
 */
export const fetchFile = async (id) => {
  // In a real application, this would make an HTTP request
  // For this example, we'll simulate an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate different responses based on id for demo purposes
      if (id === 'invalid-id') {
        reject(new Error('File not found'));
      } else if (id === 'empty-file') {
        resolve({ content: '' });
      } else if (id === 'null-file') {
        resolve(null);
      } else {
        resolve({ content: `Content for file ${id}` });
      }
    }, 100); // Simulate network delay
  });
};