import "express-async-errors";
import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import session from "express-session";
import rateLimit from "express-rate-limit";

// database
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import notesRouter from "./routes/notesRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.get("/", (req, res) => {
  res.send("Hello Whisky Notes API!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", notesRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

(async () => {
  await connectDB(process.env.MONGO_URL);
  app.listen(port, () => console.log(`Serwer is listening on port ${port}...`));
})();
