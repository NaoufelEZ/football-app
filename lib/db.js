import { Pool } from 'pg';

class DatabaseManager {
  constructor() {
    this.pool = this.createPool();
    console.log(`🗄️ Database connected: ${this.getDatabaseInfo()}`);
  }

  createPool() {
    // PRODUCTION: Neon.tech (DATABASE_URL)
    if (process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
      console.log('☁️ Using Neon.tech PostgreSQL (Production)');
      return new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        max: 20, // Production connection limit
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      });
    }
    
    // DEVELOPMENT: Local Docker PostgreSQL
    console.log('🐳 Using Local Docker PostgreSQL (Development)');
    return new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'football-app-db-1',
      database: process.env.DB_NAME || 'football',
      password: process.env.DB_PASSWORD || 'mysecretpassword',
      port: parseInt(process.env.DB_PORT) || 5432,
      max: 10, // Development connection limit
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }

  getDatabaseInfo() {
    if (process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
      const url = new URL(process.env.DATABASE_URL);
      return `Neon.tech (${url.hostname})`;
    }
    return `Local Docker (${process.env.DB_HOST}:${process.env.DB_PORT})`;
  }

  async query(text, params) {
    const start = Date.now();
    try {
      const result = await this.pool.query(text, params);
      const duration = Date.now() - start;
      
      if (process.env.DEBUG === 'true') {
        console.log(`📊 Executed query in ${duration}ms:`, { text, params });
      }
      
      return result;
    } catch (error) {
      console.error('❌ Database query error:', error);
      throw error;
    }
  }

  async connect() {
    return await this.pool.connect();
  }
}

// Singleton instance
const db = new DatabaseManager();
export default db;