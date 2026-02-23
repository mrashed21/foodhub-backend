import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import { auth } from "./lib/auth";
import errorHandler from "./middleware/error-handler";
import notFound from "./middleware/not-found";
import router from "./router/router";
const app = express();

app.use(express.json());

app.set("trust proxy", true);

app.use(
  cors({
    origin: [
      "https://frontend-foodhub-mrashed21.vercel.app",
      "https://backend-foodhub-mrashed21.vercel.app",
      "http://localhost:3000",
      "http://localhost:5000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  }),
);

/*
//! command
  npx prisma migrate dev
  npx prisma generate
  npx prisma studio
https://backend-foodhub-mrashed21.vercel.app

*/
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("FoodHub server is running");
});
// not found
app.use(notFound);
// global error
app.use(errorHandler);

export default app;
