import express from 'express';
import Router from './routes/router.js';
import serverMiddleware from './middlewares/server.js';

// DB
import { connectDB } from './db/db.js'

import 'dotenv/config'

const app = express();
const PORT = 1024 || process.env.PORT;
export const server = connectDB().then(() => app.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT + '/');
}));

// CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Allow credentials (cookies, authentication headers, etc.)
  res.header("Access-Control-Allow-Credentials", true);

  // Allow all HTTP methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  next();
});

// Other middleware
app.use(serverMiddleware);

// Handle OPTIONS requests
app.options('*', (req, res) => {
  // Set CORS headers for the preflight request
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  res.sendStatus(200);
});

// Routes
app.use(Router);