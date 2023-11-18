import mongoose from "mongoose";

export async function connectDB() {
  try {
    console.log("await");
    await mongoose.connect("mongodb://localhost/merndb");
    console.log("console is connected");
  } catch (error) {
    console.log("error");
  }
}
