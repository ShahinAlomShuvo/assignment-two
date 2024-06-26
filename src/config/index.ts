import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  dbUri: process.env.DB_URL,
};
