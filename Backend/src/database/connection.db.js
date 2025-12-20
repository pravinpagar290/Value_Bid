import mongoose from "mongoose";

export const connectionDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error(
      "MONGODB_URI environment variable is not defined. Make sure .env is loaded."
    );
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: "E-commerceDB",
    });
    console.log("Database Connected Successfully");
  } catch (e) {
    console.log(`Database Connection Failed due to ${e.message}`);
  }
};
