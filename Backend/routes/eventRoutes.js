import express from "express";
import { getEvents, getEventbyID, addEvent, updateEvent, deleteEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get('/', getEvents);
router.get("/:id", getEventbyID);
router.post("/", addEvent);
router.put("/", updateEvent);
router.delete("/", deleteEvent);

export default router; 