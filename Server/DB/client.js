import Pool from 'pg-pool';
import dotenv from 'dotenv';
import app from '../app.js';
dotenv.config();

const client = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: process.env.DB_MAX_CONNECTIONS,
  idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT,
  connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT,
});

await client.connect();
app.log.info('Connected to database');

export default client;
