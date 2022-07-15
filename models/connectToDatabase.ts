import mongoose from 'mongoose'

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/mma-fights',
) => mongoose.connect(mongoDatabaseURI)

export default connectToDatabase