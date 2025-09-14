const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { dbHelpers } = require('../database');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads', 'profile-pictures');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// JWT auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Upload profile picture
router.post('/upload-profile-picture', authenticateToken, upload.single('profilePicture'), async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Construct the public URL for the uploaded file
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    const profilePictureUrl = `${baseUrl}/uploads/profile-pictures/${req.file.filename}`;

    // Update user profile picture in database
    try {
      // Check if user exists
      const existingUser = await dbHelpers.get('SELECT * FROM users WHERE id = ?', [userId]);
      if (!existingUser) {
        // Clean up uploaded file
        fs.unlinkSync(req.file.path);
        return res.status(404).json({ error: 'User not found' });
      }

      // Get current profile data
      let profileData = {};
      if (existingUser.profileData) {
        try {
          profileData = JSON.parse(existingUser.profileData);
        } catch (e) {
          console.log('Error parsing existing profile data:', e.message);
        }
      }

      // Remove old profile picture if exists
      if (profileData.profilePicture) {
        const oldPicturePath = path.join(__dirname, '..', 'public', profileData.profilePicture);
        if (fs.existsSync(oldPicturePath)) {
          try {
            fs.unlinkSync(oldPicturePath);
          } catch (e) {
            console.log('Could not remove old profile picture:', e.message);
          }
        }
      }

      // Update profile data with new picture
      profileData.profilePicture = profilePictureUrl;

      // Save to database
      await dbHelpers.run(
        'UPDATE users SET profileData = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
        [JSON.stringify(profileData), userId]
      );

      console.log(`✅ Profile picture updated for user ${userId}`);

      res.json({
        success: true,
        profilePicture: profilePictureUrl,
        message: 'Profile picture uploaded successfully'
      });

    } catch (dbError) {
      // Clean up uploaded file on database error
      fs.unlinkSync(req.file.path);
      throw dbError;
    }

  } catch (error) {
    console.error('❌ Error uploading profile picture:', error);
    res.status(500).json({ 
      error: 'Failed to upload profile picture',
      details: error.message 
    });
  }
});

// Remove profile picture
router.delete('/remove-profile-picture', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Get user data
    const user = await dbHelpers.get('SELECT * FROM users WHERE id = ?', [userId]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let profileData = {};
    if (user.profileData) {
      try {
        profileData = JSON.parse(user.profileData);
      } catch (e) {
        console.log('Error parsing profile data:', e.message);
      }
    }

    // Remove file from filesystem if it exists
    if (profileData.profilePicture) {
      const picturePath = path.join(__dirname, '..', 'public', profileData.profilePicture);
      if (fs.existsSync(picturePath)) {
        try {
          fs.unlinkSync(picturePath);
        } catch (e) {
          console.log('Could not remove profile picture file:', e.message);
        }
      }
    }

    // Remove from profile data
    delete profileData.profilePicture;

    // Update database
    await dbHelpers.run(
      'UPDATE users SET profileData = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [JSON.stringify(profileData), userId]
    );

    console.log(`✅ Profile picture removed for user ${userId}`);

    res.json({
      success: true,
      message: 'Profile picture removed successfully'
    });

  } catch (error) {
    console.error('❌ Error removing profile picture:', error);
    res.status(500).json({ 
      error: 'Failed to remove profile picture',
      details: error.message 
    });
  }
});

module.exports = router;
