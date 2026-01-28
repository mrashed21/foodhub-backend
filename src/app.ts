import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import { auth } from "./lib/auth";
import errorHandler from "./middleware/error-handler";
import notFound from "./middleware/not-found";
import router from "./router/router";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_ORIGIN,
    credentials: true,
  }),
);

/*
//! command
  npx prisma migrate dev
  npx prisma generate
  npx prisma studio


*/
app.use("/api/v1", router);
app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.send("FoodHub server is running");
});
// not found
app.use(notFound);
// global error
app.use(errorHandler);

export default app;
