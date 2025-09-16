// API configuration for different environments
const getApiBaseUrl = () => {
  // In production on Vercel, use the deployed backend URL
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    // TODO: Replace this with your actual backend deployment URL
    // For now, return a placeholder that will fail gracefully
    return 'https://your-backend-not-deployed-yet.com';
  }
  
  // For development, use localhost
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to make API requests
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // If backend is not deployed, return mock data for testing
  if (API_BASE_URL.includes('your-backend-not-deployed-yet')) {
    console.warn('Backend not deployed yet. Using mock data.');
    
    // Mock responses for testing
    if (endpoint === '/api/users/login') {
      return { 
        user: { id: 1, name: 'Test User', email: 'test@example.com', role: 'buyer' }, 
        token: 'mock-token' 
      };
    }
    if (endpoint === '/api/users/register') {
      return { 
        user: { id: 2, name: 'New User', email: 'new@example.com', role: 'buyer' }, 
        token: 'mock-token' 
      };
    }
    
    throw new Error('Backend service not available. Please deploy your backend first.');
  }
  
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
