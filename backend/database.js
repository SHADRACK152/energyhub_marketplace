const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database file path
const dbPath = path.join(__dirname, 'energyhub.db');

// Initialize SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database:', dbPath);
  }
});

// Create tables if they don't exist
const createTables = () => {
  // Products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      originalPrice REAL,
      image TEXT,
      category TEXT,
      sellerId TEXT,
      sellerName TEXT,
      stockCount INTEGER DEFAULT 0,
      rating REAL DEFAULT 0,
      reviewCount INTEGER DEFAULT 0,
      specifications TEXT, -- JSON string
      tags TEXT, -- JSON string
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating products table:', err);
    else console.log('✅ Products table ready');
  });

  // Promo codes table
  db.run(`
    CREATE TABLE IF NOT EXISTS promo_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL, -- 'percentage' or 'fixed'
      value REAL NOT NULL,
      description TEXT,
      sellerId TEXT,
      sellerName TEXT,
      minimumOrder REAL DEFAULT 0,
      maxUses INTEGER DEFAULT 1000,
      currentUses INTEGER DEFAULT 0,
      startDate DATETIME,
      endDate DATETIME,
      isActive BOOLEAN DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating promo_codes table:', err);
    else console.log('✅ Promo codes table ready');
  });

  // Orders table
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderNumber TEXT UNIQUE NOT NULL,
      productName TEXT,
      productImage TEXT,
      price REAL,
      subtotal REAL,
      shipping REAL,
      tax REAL,
      discount REAL,
      promoCode TEXT, -- JSON string
      shippingInfo TEXT, -- JSON string
      paymentInfo TEXT, -- JSON string
      items TEXT, -- JSON string
      userId TEXT,
      userEmail TEXT,
      orderStatus TEXT DEFAULT 'confirmed',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating orders table:', err);
    else console.log('✅ Orders table ready');
  });

  // Users table (optional for future use)
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      name TEXT,
      role TEXT DEFAULT 'buyer', -- 'buyer' or 'seller'
      profileData TEXT, -- JSON string
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating users table:', err);
    else console.log('✅ Users table ready');
  });

  // QnA table for product questions and answers
  db.run(`
    CREATE TABLE IF NOT EXISTS product_qna (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL,
      question TEXT NOT NULL,
      answer TEXT,
      user_id TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating product_qna table:', err);
    else console.log('✅ QnA table ready');
  });
};

// Initialize tables
createTables();

// Helper functions for database operations
const dbHelpers = {
  // Generic query function
  query: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  // Generic insert/update function
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ 
            id: this.lastID, 
            changes: this.changes 
          });
        }
      });
    });
  },

  // Get single row
  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
};

module.exports = { db, dbHelpers };
