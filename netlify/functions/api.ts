const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/outflo";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Dynamically import routes from the compiled server code
const apiDistPath = path.join(__dirname, 'api-dist');

// Import campaign routes
const campaignRoutesPath = path.join(apiDistPath, 'routes', 'campaign.routes.js');
const campaignRoutes = require(campaignRoutesPath).default;

// Import message routes
const messageRoutesPath = path.join(apiDistPath, 'routes', 'message.routes.js');
const messageRoutes = require(messageRoutesPath).default;

// Set up routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/personalized-message', messageRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Export the serverless function
module.exports.handler = serverless(app);