import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionString = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );

    console.log(
      `MONGODB CONNECTED SUCCESSFULLY !!! DBHOST ::: ${connectionString.connection.host}`
    );
  } catch (error) {
    console.log(`Unable to connect to mongoDB !!! ERROR ::: ${error}`);
  }
};

export { connectDB };
