import 'dotenv/config';
import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

const DB_URI = getEnvVar('DB_URI');
const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const url = process.env.MONGODB_URL;
const db = process.env.MONGODB_DB;
const DB_URI = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority`;

const initMongoConnection = () => {
  console.log('Mongo connection successfully established!');
  return mongoose.connect(DB_URI);
};

export default initMongoConnection;
