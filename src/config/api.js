// API Configuration
const API_CONFIG = {
  // Use environment variable or fallback to localhost for development
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // API endpoints
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: '/api/login',
    REGISTER: '/api/register',
    
    // User endpoints
    UPLOAD_PROFILE_PICTURE: '/api/users/upload-profile-picture',
    REMOVE_PROFILE_PICTURE: '/api/users/remove-profile-picture',
    UPDATE_PROFILE: '/api/users/profile',
    
    // Other endpoints can be added here
  }
};

// Helper function to build full URL
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function for API calls with authentication
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('energyhub_token');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  };

  // Merge options, but preserve FormData content-type
  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // Remove Content-Type for FormData
  if (options.body instanceof FormData) {
    delete finalOptions.headers['Content-Type'];
  }

  const response = await fetch(buildApiUrl(endpoint), finalOptions);
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  
  return response.json();
};

// Named export for convenience
export { API_CONFIG };

export default API_CONFIG;
