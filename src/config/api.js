// API configuration for different environments
const getApiBaseUrl = () => {
  // In production on Vercel, use the deployed backend URL
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    // Your backend will be deployed to this URL pattern
    return 'https://energyhub-marketplace-backend.vercel.app';
  }
  
  // For development, use localhost
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to make API requests
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  
  return response.json();
};
