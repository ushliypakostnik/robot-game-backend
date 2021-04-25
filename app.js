import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import url from 'url';

import config from './config';

import router from './routes/index';

const app = express();

// CORS
if (config.CORS_ENABLED) {
  const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
      callback(null, origin);
    },
  };

  app.use(cors(corsOptions));
}

// db connect
mongoose.connect(config.PASS.DB.url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*
// Static
if (config.STATIC_SERVE) {
  const mediaURL = new url.URL(config.MEDIA_URL);
  app.use(mediaURL.pathname, express.static(config.MEDIA_DIR));
}
*/

app.use(router);

export default app;
