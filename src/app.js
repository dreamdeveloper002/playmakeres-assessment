import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import config from "./config/dev.js";
const app = express();

import { badgeProcessingModule } from "./components/index.js";

app.use(cors());
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    limit: "2mb",
    extended: true,
  })
);

app.use(cookieParser());

app.use(
  `${config.api.prefix.v1}/badge-processing`,
  badgeProcessingModule.routes
);

// Catch-all middleware for handling requests to undefined routes
app.use((req, res, next) => {
  res.status(404).send({
    message: "The route you are trying to reach does not exist.",
  });
});

export default app;
