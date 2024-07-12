// src/index.js
import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";

import router from "./routes";

config();

const app = express();

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin(requestOrigin, callback) {
      if (requestOrigin === "http://localhost:3000") {
        callback(null, true);
      } else if (requestOrigin === "http://localhost:3001") {
        callback(null, true);
      }
      // Only for development
      else if (requestOrigin == null) {
        callback(null, true);
      } else {
        callback(new Error(`${requestOrigin} Not allowed by CORS`));
      }
    },
  }),
);

app.use(json());

app.use("/", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
