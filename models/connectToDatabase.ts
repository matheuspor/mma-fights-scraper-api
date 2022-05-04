import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/mma-fights',
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;