import express from "express"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataPath = path.join(__dirname, "./data/resources.json")

// GET all resources
router.get("/", (req, res) => {
  try {
    const jsonData = fs.readFileSync(dataPath, "utf8");
    const resources = JSON.parse(jsonData);
    res.json(resources);
  } catch (error) {
    console.error("Failed to load resources:", error)
    res.status(500).json({ error: "Failed to load resources" })
  }
});

// GET single resource by ID (slug)
router.get("/:id", (req, res) => {
  const resourceId = req.params.id;

  try {
    const jsonData = fs.readFileSync(dataPath, "utf8");
    const resources = JSON.parse(jsonData);

    const item = resources.find((resItem) => resItem.id === resourceId);

    if (!item) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json(item);
  } catch (error) {
    console.error(`Failed to load resource ${resourceId}:`, error)
    res.status(500).json({ error: "Failed to load resource" })
  }
});

export default router; 