import express from "express" ;
import cors from "cors" ;
import eventRoutes from "../routes/eventRoutes.js" ;
import resourcesRoute from "../resources.js"

const PORT = 5000;
const app = express() ;


// IMPORTANT: Add this BEFORE your routes
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', 
    'http://localhost:4173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()) ;

app.use("/api/events", eventRoutes);

// Resources Route

app.use("/api/resources", resourcesRoute);

app.get("/", (req, res) => {
  res.send("Event API Running...");
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", port: PORT, timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Events API: http://localhost:${PORT}/api/events`);
});