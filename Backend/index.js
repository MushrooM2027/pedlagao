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
  app.use(cors());
  app.use(express.json());
  app.use('/api/users', UserApi);
  app.use('/api/plant', PlantationRequestApi);
  app.use('/api/media', require('./Apis/mediaFileApi'));
  app.use('/api/request', RequestFullfillmentApi);
  app.use('/api/post', Posts);
  app.use('/api/likes', Like);
  app.use('/api/comment', Comment)
  app.use('/uploads', express.static(path.join(__dirname, 'media')));

  sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
  });

  app.use((err, req, res, next) => {
    console.error("Global Error:", err.stack || err.message || err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  });
