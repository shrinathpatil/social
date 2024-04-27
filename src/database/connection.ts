import mongoose from "mongoose";

let connection: boolean = false;

export const connectToDb = async () => {
  try {
    if (connection) {
      console.log("already connected!");
      return;
    }

    mongoose.set("strictQuery", true);
    const url = process.env.MONGODB_SERVER_URL!;
    const connect = await mongoose.connect(url);
    connection = connect.connections[0].readyState === 1;
  } catch (error) {
    console.log("error connecting to db!");
  }
};
