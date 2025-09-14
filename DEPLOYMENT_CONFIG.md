# Deployment Configuration Guide

This document explains how to properly configure API URLs for different deployment environments.

## Problem with Hardcoded URLs

The previous code used hardcoded URLs like `http://localhost:5000` which causes problems during deployment:

```javascript
// ❌ BAD - Will break in production
const response = await fetch('http://localhost:5000/api/users/upload-profile-picture', {
  method: 'POST',
  // ...
});
```

## Solution: Environment-Based Configuration

We've implemented a flexible API configuration system:

### 1. API Configuration (`src/config/api.js`)

```javascript
// ✅ GOOD - Uses environment variables
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  ENDPOINTS: {
    UPLOAD_PROFILE_PICTURE: '/api/users/upload-profile-picture',
    // ... other endpoints
  }
};
```

### 2. Environment Variables

#### Development (`.env`)
```
VITE_API_URL=http://localhost:5000
```

#### Production (`.env.production` or set by hosting provider)
```
VITE_API_URL=https://api.yourdomain.com
```

#### Staging (`.env.staging`)
```
VITE_API_URL=https://api-staging.yourdomain.com
```

## Deployment Instructions

### Vercel Deployment
1. Set environment variable in Vercel dashboard:
   - `VITE_API_URL` = `https://your-backend-url.vercel.app`

### Netlify Deployment
1. Set environment variable in Netlify dashboard:
   - `VITE_API_URL` = `https://your-backend-url.netlify.app`

### Docker Deployment
```dockerfile
# Set environment variable in Dockerfile
ENV VITE_API_URL=https://api.yourdomain.com
```

### Traditional Server Deployment
1. Create `.env.production` file on server:
```
VITE_API_URL=https://api.yourdomain.com
```

## Usage in Components

Instead of hardcoded URLs, use the API helper:

```javascript
// ❌ OLD WAY
const response = await fetch('http://localhost:5000/api/users/upload-profile-picture', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});

// ✅ NEW WAY
import { apiCall, API_CONFIG } from '../../config/api';

const data = await apiCall(API_CONFIG.ENDPOINTS.UPLOAD_PROFILE_PICTURE, {
  method: 'POST',
  body: formData
});
```

## Benefits

1. **Environment Flexibility**: Automatically adapts to different environments
2. **Easy Deployment**: No code changes needed for different environments  
3. **Centralized Configuration**: All API endpoints in one place
4. **Error Handling**: Built-in error handling and authentication
5. **Type Safety**: Clear endpoint definitions

## Troubleshooting

### Build Time Issues
If you get `import.meta.env.VITE_API_URL is undefined`:
1. Make sure the environment variable starts with `VITE_`
2. Restart the development server after adding new env vars
3. Check that `.env` file is in the project root

### Runtime Issues  
If API calls fail in production:
1. Verify `VITE_API_URL` is set correctly in hosting provider
2. Check that backend CORS is configured for the frontend domain
3. Ensure backend is accessible from the frontend URL

### CORS Configuration
Make sure your backend allows requests from your frontend domain:

```javascript
// Backend CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',  // Development
    'https://yourdomain.com', // Production
    'https://staging.yourdomain.com' // Staging
  ]
}));
```
