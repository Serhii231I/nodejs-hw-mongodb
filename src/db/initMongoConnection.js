import 'dotenv/config';
import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

const DB_URI = getEnvVar('DB_URI');

const initMongoConnection = () => {
  console.log('Mongo connection successfully established!');
  return mongoose.connect(DB_URI);
};

export default initMongoConnection;
