import mongoose, { ConnectOptions } from "mongoose";
import "dotenv/config";

const MONGO_URI: string = process.env.MONGO_URL_CONNECTION || "";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

export const db = mongoose.connection;
