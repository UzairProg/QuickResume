import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    }); // what it does is when connected to the database it will log this message... Listen to connection events

    let MONGODB_URI = process.env.MONGODB_URI;
    const dbName = "quickresume";
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(`${MONGODB_URI}/${dbName}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;