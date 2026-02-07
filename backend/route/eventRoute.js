import express from "express";
import { createEvent, getLatest } from "../service/eventServices.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const event = await createEvent(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/latest", async (req, res) => {
  const data = await getLatest(200);
  res.json(data);
});

export default router;
