import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use path.join with __dirname for Vercel compatibility
const getFilePath = () => path.join(__dirname, "..", "data", "events.json");

const readData = () => {
  const filePath = getFilePath();
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writeData = (data) => {
  const filePath = getFilePath();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

export const getEvents = (req, res) => {
  try {
    console.log('GET /api/events - Request received');
    console.log('Request origin:', req.headers.origin);
    const events = readData();
    console.log('Events loaded:', events.length, 'events');
    res.json(events);
    console.log('Response sent successfully');
  } catch (error) {
    console.error('Error in getEvents:', error);
    res.status(500).json({ error: 'Failed to load events', message: error.message });
  }
};

export const getEventbyID = (req, res) => {
  try {
    const events = readData();
    const event = events.find((u) => u.id === req.params.id);

    if (event) {
      res.json(event);
    } else {
      return res.status(404).json({ message: "Event not Found" });
    }
  } catch (error) {
    console.error('Error in getEventbyID:', error);
    res.status(500).json({ error: 'Failed to load event', message: error.message });
  }
};

export const addEvent = (req, res) => {
  try {
    const events = readData();

    const title = req.body.eventTitle || "untitled-event";
    const id = slugify(title);
    if (id) {
      const newEvent = { id, ...req.body };
      events.push(newEvent);
      writeData(events);
      res.status(201).json(newEvent);
    } else {
      res.status(404).json({ message: "Event data not valid" });
    }
  } catch (error) {
    console.error('Error in addEvent:', error);
    res.status(500).json({ error: 'Failed to add event', message: error.message });
  }
};

// UPDATE event
export const updateEvent = (req, res) => {
  try {
    const events = readData();
    const id = req.params.id;

    const index = events.findIndex((e) => e.id === id);
    if (index === -1) return res.status(404).json({ message: "Event not found" });

    events[index] = { ...events[index], ...req.body };

    writeData(events);
    res.json(events[index]);
  } catch (error) {
    console.error('Error in updateEvent:', error);
    res.status(500).json({ error: 'Failed to update event', message: error.message });
  }
};

// DELETE event
export const deleteEvent = (req, res) => {
  try {
    const events = readData();
    const id = req.params.id;

    const index = events.findIndex((e) => e.id === id);
    if (index === -1) return res.status(404).json({ message: "Event not found" });

    const removed = events.splice(index, 1);

    writeData(events);
    res.json(removed[0]);
  } catch (error) {
    console.error('Error in deleteEvent:', error);
    res.status(500).json({ error: 'Failed to delete event', message: error.message });
  }
};
