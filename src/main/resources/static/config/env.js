import dotenv from 'dotenv';
import path from 'path';

const root = path.join.bind(this, __dirname, '../../');
dotenv.config({ path: root('.env') });

/* eslint-disable */

// URl
export const APP_URL = process.env.APP_URL;

// Environment
export const NODE_ENV = process.env.NODE_ENV;

/* eslint-enable */
