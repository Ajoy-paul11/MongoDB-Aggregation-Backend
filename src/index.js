import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });

connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.error("Server error: ", err);
        });

        app.listen(process.env.PORT || 5001, () => {
            console.log(` Server is running on PORT: ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to the database: ", err);
    });
