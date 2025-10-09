const { Pool } = require('pg');
require('dotenv').config();

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to PostgreSQL database:', err.message);
    return;
  }
  console.log('✅ Connected to Neon PostgreSQL database');
  release();
});

// Create tables if they don't exist
const createTables = async () => {
  try {
    // Products table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        originalPrice DECIMAL(10,2),
        image TEXT,
        category VARCHAR(100),
        sellerId VARCHAR(255),
        sellerName VARCHAR(255),
        stockCount INTEGER DEFAULT 0,
        rating DECIMAL(3,2) DEFAULT 0,
        reviewCount INTEGER DEFAULT 0,
        specifications JSONB,
        tags JSONB,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Products table ready');

    // Promo codes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS promo_codes (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        type VARCHAR(20) NOT NULL, -- 'percentage' or 'fixed'
        value DECIMAL(10,2) NOT NULL,
        description TEXT,
        sellerId VARCHAR(255),
        sellerName VARCHAR(255),
        minimumOrder DECIMAL(10,2) DEFAULT 0,
        maxUses INTEGER DEFAULT 1000,
        currentUses INTEGER DEFAULT 0,
        startDate TIMESTAMP,
        endDate TIMESTAMP,
        isActive BOOLEAN DEFAULT true,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Promo codes table ready');

    // Orders table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        orderNumber VARCHAR(50) UNIQUE NOT NULL,
        productName VARCHAR(255),
        productImage TEXT,
        price DECIMAL(10,2),
        subtotal DECIMAL(10,2),
        shipping DECIMAL(10,2),
        tax DECIMAL(10,2),
        discount DECIMAL(10,2),
        promoCode JSONB,
        shippingInfo JSONB,
        paymentInfo JSONB,
        items JSONB,
        userId VARCHAR(255),
        userEmail VARCHAR(255),
        orderStatus VARCHAR(50) DEFAULT 'confirmed',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Orders table ready');

    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        name VARCHAR(255),
        role VARCHAR(20) DEFAULT 'buyer', -- 'buyer' or 'seller'
        profileData JSONB,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table ready');

    // QnA table for product questions and answers
    await pool.query(`
      CREATE TABLE IF NOT EXISTS product_qna (
        id SERIAL PRIMARY KEY,
        product_id VARCHAR(255) NOT NULL,
        question TEXT NOT NULL,
        answer TEXT,
        user_id VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ QnA table ready');

  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
  }
};

// Initialize tables
createTables();

// Helper functions for database operations
const dbHelpers = {
  // Generic query function
  query: async (sql, params = []) => {
    try {
      const result = await pool.query(sql, params);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Generic insert/update function
  run: async (sql, params = []) => {
    try {
      const result = await pool.query(sql, params);
      return {
        rows: result.rows,
        rowCount: result.rowCount,
        insertId: result.rows[0]?.id || null
      };
    } catch (error) {
      throw error;
    }
  },

  // Get single row
  get: async (sql, params = []) => {
    try {
      const result = await pool.query(sql, params);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = { pool, dbHelpers };
