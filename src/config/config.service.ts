import * as dotenv from 'dotenv';

dotenv.config();

export const ConfigService = {
  database: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  moralis: {
    apiKey: process.env.MORALIS_API_KEY,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: +process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    to: process.env.EMAIL_TO,
  },
};
