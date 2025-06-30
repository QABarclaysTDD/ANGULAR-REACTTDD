// userService.js
export const fetchUsers = async () => {
  // In a real app, this would make an actual HTTP request
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};