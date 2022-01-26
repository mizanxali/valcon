import mongoose from 'mongoose';
import config from 'config';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.dbUri as string);
    console.log('Database connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
