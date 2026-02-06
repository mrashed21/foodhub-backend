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
// Configure CORS to allow both production and Vercel preview deployments
const allowedOrigins = [
  process.env.APP_URL || "http://localhost:4000",
  process.env.PROD_APP_URL, // Production frontend URL
  "http://localhost:3000",
  "http://localhost:4000",
  "https://frontend-foodhub-mrashed21.vercel.app",
  "https://backend-foodhub-mrashed21.vercel.app",
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
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
