import mongoose from "mongoose";

const DB_NAME = "agree"

const connectDB = async () => {
    try {
        const dbConnection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

        console.log(`\n MongoDB connected, Host: ${dbConnection.connection.host}`);

    } catch (error) {
        console.error("MongoDB connection error: ", error)
        process.exit(1)
    }
}


export default connectDB;