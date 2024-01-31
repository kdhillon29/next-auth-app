import mongoose from "mongoose";

async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const dbConnection = mongoose.connection;
    dbConnection.on("connected", () => {
      console.log("mongo connected successfully");
    });
    dbConnection.on("error", (err) => {
      console.log("error in mongodb connect", err.message), process.exit();
    });
  } catch (error) {
    console.log("error db connect", error);
  }
}

export default connect;
