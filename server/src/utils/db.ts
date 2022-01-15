import mongoose from 'mongoose';
import config from 'config';

export async function connectDB() {
  try {
    await mongoose.connect(config.get('dbUri'));
    console.log('Database connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
