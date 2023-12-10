import express, { Express } from "express";
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app: Express = express();
const PORT = +process.env.PORT!;

app.listen(PORT, () => console.log("Port :", PORT));
