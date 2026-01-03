import express from "express";
import { errorController } from "./middlewares/errorController.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import aggregation01Routes from "./routes/aggregation01.route.js"



app.use("/api/v1/users/1", aggregation01Routes);
app.use("/api/v1/users/1", aggregation01Routes);

app.use(errorController);

export { app };