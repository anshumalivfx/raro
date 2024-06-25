import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to Database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URI || "");
    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error(`Error connecting to Mongo : ${error}`);
    process.exit(1);
  }
}
