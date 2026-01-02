import express from "express";
import { errorController } from "./middlewares/errorController.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(errorController);

export { app };