import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set');
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, { dbName: 'menudirect' });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Mongo connection error', err.message);
    process.exit(1);
  }
};
