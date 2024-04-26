const config = {
  appName: process.env.APP_NAME,
  port: process.env.PORT || 3000,
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  api: {
    prefix: {
      v1: process.env.API_PREFIX_V1,
    },
  },
};

export default config;
