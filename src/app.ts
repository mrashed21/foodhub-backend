import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("FoodHub server is running");
});
export default app;
