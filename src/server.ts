import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://assignment-two:EMxrK0Y1prdqbH8i@cluster0.ccpilkz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");

    app.listen(5000, () => {
      console.log(`App is listening on port ${5000}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
