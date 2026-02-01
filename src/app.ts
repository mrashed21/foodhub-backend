// import { toNodeHandler } from "better-auth/node";
// import cors from "cors";
// import express from "express";
// import { auth } from "./lib/auth";
// import errorHandler from "./middleware/error-handler";
// import notFound from "./middleware/not-found";
// import router from "./router/router";

// const app = express();

// app.use(express.json());

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       const allowedOrigins = [
//         "http://localhost:3000",
//         "https://foodhub-frontend-flame.vercel.app",
//         process.env.APP_ORIGIN,
//       ].filter(Boolean);

//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(null, true);
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "Cookie",
//       "X-Requested-With",
//     ],
//     exposedHeaders: ["Set-Cookie"],
//   }),
// );

// app.options("*", cors());

// app.use("/api/v1", router);
// app.all("/api/auth/*splat", toNodeHandler(auth));

// app.get("/", (req, res) => {
//   res.send("FoodHub server is running");
// });

// app.use(notFound);
// app.use(errorHandler);

// export default app;

import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import { auth } from "./lib/auth";
import errorHandler from "./middleware/error-handler";
import notFound from "./middleware/not-found";
import router from "./router/router";

const app = express();

app.use(express.json());

// CORS middleware
const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://foodhub-frontend-flame.vercel.app",
      process.env.APP_ORIGIN,
    ].filter(Boolean) as string[];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for now
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cookie",
    "X-Requested-With",
  ],
  exposedHeaders: ["Set-Cookie"],
};

app.use(cors(corsOptions));

// ❌ Remove this line - it's causing the error
// app.options("*", cors());

app.use("/api/v1", router);
app.use("/api/auth", toNodeHandler(auth)); // ✅ Changed from app.all to app.use

app.get("/", (req, res) => {
  res.send("FoodHub server is running");
});

app.use(notFound);
app.use(errorHandler);

export default app;
