import PASS from './pass';

const env = process.env.NODE_ENV;

if (env === 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const PORT = 8083;

const common = {
  VERSION: '0.1.0',
  TITLE: 'Company',
  PORT: process.env.PORT || PORT,
  PASS: {
    DB: {
      url: process.env.DB_URL || PASS.DB.url,
    },
    RANDOM_BYTES: PASS.RANDOM_BYTES,
  },
};

const development = {
  ...common,
  HOST: process.env.HOST || `http://localhost:${PORT}`,
  CORS_ENABLED: true,
  STATIC_SERVE: false,
};

const production = {
  ...common,
  HOST: process.env.HOST || '',
  CORS_ENABLED: false,
  STATIC_SERVE: false,
};

const config = {
  development,
  production,
};

export default config[env];
