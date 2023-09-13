import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

export const connectToDatabase = async () => {
   try {
      const connection = await mongoose.connect(MONGO_URI);
      console.log(`Database is connected at: ${connection.connection.host}`);
   } catch (err) {
      console.log(err);
      process.exit(1);
   }
};
