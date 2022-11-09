import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";

import appRouter from "./routes";
import logger from "./misc/logger";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running....");
});

app.use(appRouter);

// middleware for handling the not found error. Order should be handled here.
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
