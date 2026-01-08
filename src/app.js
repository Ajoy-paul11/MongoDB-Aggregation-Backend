import express from "express";
import { errorController } from "./middlewares/errorController.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import aggregation01Routes from "./routes/aggregation01.route.js";
import aggregation02Routes from "./routes/aggregation02.route.js";
import aggregation03Routes from "./routes/aggregation03.route.js";
import aggregation04Routes from "./routes/aggregation04.route.js";
import aggregation05Routes from "./routes/aggregation05.route.js";



app.use("/api/v1/users/1", aggregation01Routes);
app.use("/api/v1/users/2", aggregation02Routes);
app.use("/api/v1/users/3", aggregation03Routes);
app.use("/api/v1/users/4", aggregation04Routes);
app.use("/api/v1/users/5", aggregation05Routes);


app.use(errorController);

export { app };