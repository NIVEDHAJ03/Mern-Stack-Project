import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nive_18:030205@cluster0.cdmpbpg.mongodb.net/food_delivery"
    );

    console.log("DB Connected");
  } catch (error) {
    console.log("Database Error:", error);
  }
};