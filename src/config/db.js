import mongoose from "mongoose";
import { env } from "./env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(env.mongodbUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
