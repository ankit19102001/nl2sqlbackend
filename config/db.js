import { Pool } from 'pg';
import { createPool } from 'mysql2/promise';

const dbType = process.env.DB_TYPE;

let db;

if (dbType === 'postgres') {
    db = new Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
    });
} else if (dbType === 'mysql') {
    db = await createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
    });
} else {
    throw new Error('Unsupported DB_TYPE. Must be either "postgres" or "mysql".');
}

export default db;
