import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {rateLimiter} from "./middleware/rateLimiter.js";
import {validator} from "./middleware/validator.js";
import eventRoute from "./route/eventRoute.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());
app.use(rateLimiter);  

// DB Connect
connectDB();

// Routes
app.get("/health", (req, res) => {
  res.json({ status: "system alive" });
});

app.get("/test", (req, res) => {
  res.json({ msg: "You passed rate limiter" });
});

app.post(
  "/data",
  validator({
    name: { required: true, type: "string" },
    value: { required: true, type: "number", min: 0 }
  }),
  (req, res) => {
    res.json({ msg: "Data accepted", data: req.body });
  }
);

// Event Routes
app.use("/api/events",eventRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
