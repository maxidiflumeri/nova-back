import dotenv from 'dotenv';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 5000,
  SERVER: process.env.SERVER || 'srvnova.database.windows.net',
  DATABASE: process.env.DATABASE || 'nova-db-dev',
  USER: process.env.USER || 'nova',
  PASSWORD: process.env.PASSWORD || 'Nov42020'
}