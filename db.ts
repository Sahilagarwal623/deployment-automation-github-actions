import mongoose from "mongoose";


const mongourl = process.env.MONGO_URL as string;

export const connectDB = async () => {
  await mongoose.connect(mongourl);
  console.log("MongoDB connected");
}