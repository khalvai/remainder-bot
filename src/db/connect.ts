import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const dbUrl = process.env.dbUrl as string;
export function connect() {
  mongoose
    .connect(dbUrl)
    .then(() => console.log('connected to database successfuly'))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}
