import 'dotenv/config';
import mongoose from "mongoose";
const DB_URI = process.env.DB_URI;

const initMongoConnection = () => {
  console.log("Mongo connection successfully established!");
  return mongoose.connect(DB_URI);
};

export default initMongoConnection;