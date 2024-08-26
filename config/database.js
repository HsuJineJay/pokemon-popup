const { Pool } = require('pg');
require('dotenv').config();

//連線prorgresSQL 使用.env的資料
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,  // PostgreSQL預設port是5432
  ssl: { rejectUnauthorized: false }, // 使用SSL連接資料庫
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};