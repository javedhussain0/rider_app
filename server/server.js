import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.bcrypt = bcrypt;

app.use(cors(
    {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
));

app.use(
  express.json({
    limit: "50mb",
  })
);
const connectServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
const connectApp = async () => {
    connectServer();
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
}


connectApp();