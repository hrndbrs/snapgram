if (process.env.NODE_ENV !== "production") require("dotenv").config();
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./lib/middlewares/errorHandler";
import router from "./routers";

const app: Application = express();
const PORT = +process.env.PORT!;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => console.log("Port :", PORT));
