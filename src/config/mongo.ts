import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const db = process.env.DB_URL ?? '';
const options = {
  // need url parser...
  useNewUrlParser: true,
  useUnifiedTopology: true
};


const dbConnect = async () => {
  await mongoose.connect(db, options)
};

export default dbConnect;
