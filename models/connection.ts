import mongoose from 'mongoose';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_DB_URL || '',
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;