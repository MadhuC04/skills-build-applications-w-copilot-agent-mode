import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  return mongoose.connect(mongoUri);
};

export default connectToDatabase;
