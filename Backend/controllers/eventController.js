import fs from "fs";
import path from "path";

const filePath = path.resolve("data/events.json");

const readData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeData = (data) => {
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
  const events = readData();
  const event = events.find((u) => u.id === req.params.id);

  if (event) {
    res.json(event);
  } else {
    return res.status(404).json({ message: "Event not Found" });
  }
};

export const addEvent = (req, res) => {
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
};

// UPDATE event
export const updateEvent = (req, res) => {
  const events = readData();
  const id = req.params.id;

  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return res.status(404).json({ message: "Event not found" });

  events[index] = { ...events[index], ...req.body };

  writeData(events);
  res.json(events[index]);
};

// DELETE event
export const deleteEvent = (req, res) => {
  const events = readData();
  const id = req.params.id;

  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return res.status(404).json({ message: "Event not found" });

  const removed = events.splice(index, 1);

  writeData(events);
  res.json(removed[0]);
};