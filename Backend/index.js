require('./Utils/tableRelations');
const express = require('express');
const sequelize = require('./Config/db');
const UserApi = require('./Apis/userApi');
const PlantationRequestApi = require('./Apis/PlantationRequestApi');
const RequestFullfillmentApi = require('./Apis/requestFullfillmentApi');
const Posts = require('./Apis/postApi');
const Like = require('./Apis/likesApi');
const Comment = require('./Apis/commentsApi')
const cors = require('cors');
const path = require('path');

const app = express();
require('dotenv').config();

// Improved CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? "https://pedlagao.vercel.app" 
    : "http://localhost:3000",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API routes
app.use(`api/users`, UserApi);
app.use('/api/plant', PlantationRequestApi);
app.use('/api/media', require('./Apis/mediaFileApi'));
app.use('/api/request', RequestFullfillmentApi);
app.use('/api/post', Posts);
app.use('/api/likes', Like);
app.use('/api/comment', Comment)
app.use('/uploads', express.static(path.join(__dirname, 'media')));

// Start server
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack || err.message || err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});