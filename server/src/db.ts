import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool(
    process.env.DATABASE_URL 
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false } // Почти винаги нужно за облачни бази
      }
    : {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        ssl: false // Локално обикновено нямаме SSL
      }
);

export default pool;