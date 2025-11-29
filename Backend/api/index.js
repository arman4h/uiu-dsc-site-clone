import express from "express";
import cors from "cors";
import eventRoutes from "../routes/eventRoutes.js";
import resourcesRoute from "../resources.js";

const PORT = process.env.PORT || 5000;
const app = express();

// CORS configuration - allows Vercel and Netlify domains
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:4173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    // Allow Vercel and Netlify preview/production domains
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.netlify.app')
    ) {
      return callback(null, true);
    }

    // Allow all in production (you can make this stricter)
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/resources", resourcesRoute);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "UIU DSC API Running",
    endpoints: {
      events: "/api/events",
      resources: "/api/resources",
      health: "/health"
    }
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", port: PORT, timestamp: new Date().toISOString() });
});

// Only listen in development (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Events API: http://localhost:${PORT}/api/events`);
  });
}

// Export for Vercel serverless
export default app;
